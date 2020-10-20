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
} from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";

// Redux
import { connect } from "react-redux";
import { ManagerActions as Actions } from "../../../redux/actions/";

// components
import Page from "../components/Page";
import ProfileAvatar from "../../shared/ProfileAvatar";
import CustomForm from "../../shared/CustomForm";
import ToasterNotification from "../../shared/notifiers/toaster/ToasterNotification";
import TaoserSnackBar from "../../shared/notifiers/toaster/ToasterSnackBar";
import tinyTheme from "../../../themes/tinyTheme";
import { ToastContainer } from "react-toastify";
import ToasterSnackBar from "../../shared/notifiers/toaster/ToasterSnackBar";

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
  // console.log("User from the Redux State : ", user);
  const [state, setState] = useState(user);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Define notification state
  const [alertOpen, setAlertOpen] = useState(false);
  const toasterContent = (
    <Alert variant="filled" severity="success">
      Profile mis à jours avec succès
    </Alert>
  );
  const closeToaster = () => setAlertOpen(false);

  // Update field's initial falues
  nom.props.value = state.nom;
  prenom.props.value = state.prenom;
  email.props.value = state.email;
  phone.props.value = state.phone;

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

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    // Redux update action dispatch
    props.updateProfile(event);

    console.log(props);
    // Display notification snackbar toaster
    setAlertOpen(true);
  };
  return (
    <Page className={classes.root} title="Compte">
      <Container maxWidth="lg">
        <ToasterSnackBar
          open={alertOpen}
          onClose={closeToaster}
          autoHideDuration={6000}
          //  message={"Profile mis à jours avec succès"}
          children={toasterContent}
        />

        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Card
              //   className={clsx(classes.root, className)}
              {...cardProps}
            >
              <CardContent>
                <ProfileAvatar
                  firstname={user.nom}
                  lastname={user.prenom}
                  avatar={user.avatar}
                  descriptionTitle={user.jobTitle}
                  classes={classes}
                />
              </CardContent>
              <Divider />
              <CardActions>
                <Button color="primary" fullWidth variant="text">
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
              <MuiThemeProvider theme={tinyTheme}>
                <CustomForm
                  validationSchema={validationSchema}
                  fieldsHiearchy={formStructure}
                  initialState={state}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitLabel={"Mettre à jours"}
                />
              </MuiThemeProvider>
            </Card>
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
  user: state.managerReducer.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (params) => dispatch(Actions.updateProfile(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
