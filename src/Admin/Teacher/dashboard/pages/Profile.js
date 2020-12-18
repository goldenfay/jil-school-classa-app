import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
// import { MuiThemeProvider } from "@material-ui/core/styles";
import * as Yup from "yup";
import axios from "axios";

// Redux
import { connect } from "react-redux";
import { TeacherActions as Actions } from "../../../../redux/actions/";

// components
import Page from "../../../shared/Page";
import ProfileAvatar from "../../../shared/ProfileAvatar";
import CustomForm from "../../../shared/CustomForm";
import LoadingComponent from "../../../shared/LoadingComponent";
import ToasterSnackBar from "../../../shared/notifiers/toaster/ToasterSnackBar";
// import TeacherService from "../../../../services/teacherServices";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card: {
    padding: theme.spacing(2),
  },
  avatar: {
    height: 100,
    width: 100,
  },
}));

const validationSchema = Yup.object({
  nom: Yup.string()
    .max(20, "Le nom de famille ne doit pas dépasser 20 caractères")
    .required("Champs Obligatoire"),
  prenom: Yup.string()
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .required("Champs Obligatoire"),
  email: Yup.string()
    .email("Adresse Email invalide")
    .required("Champs Obligatoire"),
  phone: Yup.string()
    .trim()
    .matches(/^0[5679]\d{8}$/, "Numéro de télephone invalide")
    .required("Champs Obligatoire"),
  newpassword: Yup.string(),
  currentpassword: Yup.string().test(
    "passwords-match",
    "Vous devez saisir le mot de passe actuel",
    function (value) {
      // console.log(this.parent);
      return (
        !this.parent.newpassword ||
        this.parent.newpassword === "" ||
        (this.parent.newpassword !== "" && value && value !== "")
      );
      // return false;
    }
  ),
});
const nom = {
  type: "input",
  props: { name: "nom", required: true, type: "text", label: "Nom" },
};
const prenom = {
  type: "input",
  props: { name: "prenom", required: true, type: "text", label: "Prenom" },
};
const email = {
  type: "input",
  props: { name: "email", required: true, type: "email", label: "Email" },
};
const phone = {
  type: "input",
  props: { name: "phone", required: true, type: "text", label: "Télephone" },
};

const constructPasswordField = (params) => ({
  endAdornment: (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={params.handleClickShowPassword}
      >
        {params.showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  ),
});

export const Profile = ({ className, cardProps, ...props }) => {
  const classes = useStyles();
  const user = props.user;
  // States
  const [state, setState] = useState({
    ...user,
    currentpassword: "",
    newpassword: "",
  });
  const [isLoding, setisLoding] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Define notification state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({
    severity: "success",
    message: "Profile mis à jours avec succès",
  });
  const toasterContent = (
    <Alert variant="filled" severity={alertProps.severity}>
      {alertProps.message}
    </Alert>
  );
  const closeToaster = () => setAlertOpen(false);
  const [progressValue, setProgressValue] = useState(0);

  // Update field's initial falues
  nom.props.value = state.nom;
  prenom.props.value = state.prenom;
  email.props.value = state.email;
  phone.props.value = state.phone;
  // const formState=

  /**
   * Handle toggle show/hide password
   * @param {*} name
   */
  const handleShowPassword = (name) => {
    if (name === "currentpassword")
      setShowCurrentPassword(!showCurrentPassword);
    if (name === "newpassword") setShowNewPassword(!showNewPassword);
  };

  const currentpassword = {
    type: "input",
    props: {
      name: "currentpassword",
      type: showCurrentPassword ? "text" : "password",
      label: "Mot de passe actuel",
      InputProps: constructPasswordField({
        showPassword: showCurrentPassword,
        handleClickShowPassword: (e) => handleShowPassword("currentpassword"),
      }),
    },
  };
  const newpassword = {
    type: "input",
    props: {
      name: "newpassword",
      type: showNewPassword ? "text" : "password",
      label: "Nouveau mot de passe",
      InputProps: constructPasswordField({
        showPassword: showNewPassword,
        handleClickShowPassword: (e) => handleShowPassword("newpassword"),
      }),
    },
  };
  // Define the shape of the form
  const formStructure = [
    [nom, prenom], // This is a row in the form grid
    [email, phone],
    [currentpassword, newpassword],
  ];

  const handleLoadImg = (event) => {
    const file = event.currentTarget.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileToAdd = {
        file: file,
        data: fileReader.result,
        isUploading: false,
      };
      const changesObj = {
        ...state,
        imgFile: fileToAdd,
      };
      setState(changesObj);
    };
    fileReader.onerror = () => {
      console.log(
        "Une est s'est produite lors de chargement de l'image depuis le disque"
      );
    };

    fileReader.readAsDataURL(file);
  };

  const uploadImage = () => {
    //Update file (Change its state to uploading)
    setState({
      ...state,
      imgFile: {
        ...state.imgFile,
        isUploading: true,
      },
    });

    // Send files to Server
    const data = new FormData();
    data.append("file", state.imgFile.file);
    return axios
      .post("http://localhost:4000/upload/admins/profileImg", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setProgressValue((progressEvent.loaded / progressEvent.total) * 100);
        },
      })
      .then(
        (res) => {
          console.log(`Server result : ${res}`);
          if (res.status === 200) {
            console.log("File successfullly uploaded.");
            return Promise.resolve({ ok: true, res: res });
          }
          return Promise.reject("L'image n'a pas pu chargée correcttement");
        },
        (err) => {
          return Promise.reject(
            `Une erreur est survenu lors de chargement : ${err}`
          );
        }
      );
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (data) => {
    const changes = Object.assign(
      {},
      ...Object.keys(user)
        .map((key) => {
          if (data[key] && user[key] !== data[key] && data[key] !== "")
            return {
              [key]: data[key],
            };
          else return undefined  
        })
        .filter((el) => !(typeof el === "undefined"))
    );
    if (state.imgFile) changes.image = state.imgFile.file;
    if (data.currentpassword && data.newpassword) {
      changes.oldPassword = data.currentpassword;
      changes.newPassword = data.newpassword;
    }

    // If no field is changed, do not do anything, quit
    if (!Object.keys(changes).length) return;
    changes.id = user.id;

    setisLoding(true)
    props
      .updateProfile({ ...changes, adminType: "enseignant", id: user.id })
      .then(
        (res) => {
          setAlertProps({
            severity: "success",
            message: "Profile mis à jours avec succès",
          });
          setAlertOpen(true);
          setisLoding(false)
        },
        (err) => {
          // props.updateProfile({ type: "UPDATE_PROFILE_FAILED", err });
          setAlertProps({
            severity: "error",
            message: `Une erreur s'est produite ${
              err.message ? err.message : ""
            }`,
          });
          setAlertOpen(true);
          setisLoding(false)
        }
      );
  };
  return (
    <Page className={classes.root} title="Compte">
      <Container maxWidth="lg">
        <ToasterSnackBar
          open={alertOpen}
          onClose={closeToaster}
          autoHideDuration={6000}
          children={toasterContent}
        />

        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Card {...cardProps}>
              <CardContent>
                <ProfileAvatar
                  firstname={user.nom}
                  lastname={user.prenom}
                  avatar={(state.imgFile && state.imgFile.data) || user.image}
                  descriptionTitle={user.jobTitle}
                  classes={classes}
                />
              </CardContent>
              <Divider />
              <CardActions>
                <form encType="multipart/form-data">
                  <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  hidden
                  accept="image/png, image/jpeg"
                  onChange={handleLoadImg}
                />
                </form>
                <Button
                  component="label"
                  htmlFor="profilePicture"
                  color="primary"
                  fullWidth
                  variant="text"
                >
                  Modifier votre avatar
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <Card>
              <CardHeader
                subheader="Vous pouvez modifier vos informations"
                title="Paramètres du profile"
              />
              <Divider />
              {/* <MuiThemeProvider theme={tinyTheme}> */}
              <LoadingComponent 
                component={<CustomForm
                  validationSchema={validationSchema}
                  fieldsHiearchy={formStructure}
                  initialState={state}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitLabel={"Mettre à jours"}
                />}
                controller={isLoding}
                />
              {/* </MuiThemeProvider> */}
            </Card>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} sm={8}>
            {state.avatar != null && progressValue > 0 && (
              <LinearProgress
                variant="determinate"
                color={"primary"}
                value={progressValue}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = (state) => ({
  // user: state.managerReducer.user,
  user: state.adminReducer.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // updateProfile: (params) =>dispatch(params),
    updateProfile: (params) => dispatch(Actions.updateProfile(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
