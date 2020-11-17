import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  IconButton,
  Paper,
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { Cancel as CancelIcon, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as Yup from "yup";

// components
import Page from "../../../../shared/Page";
import CustomForm from "../../../../shared/CustomForm";
import CustomUploadButton from "../../../../shared/CustomUploaderButton";
import CustomTable from "../../../../shared/tables/CustomTable";
import tinyTheme from "../../../../../themes/tinyTheme";
import ToasterSnackBar from "../../../../shared/notifiers/toaster/ToasterSnackBar";
import Modal from "../../../../shared/Modal";
import UpdatePub from "./Update";
// Data
import { pubsHeadCells } from "../../../../data/tableHeads";
import managerService from "../../../../../services/managerServices";

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
    height: 200,
    width: 200,
  },
  previewBox: {
    minHeight: 200,
    minWidth: 200,
  },
  thumbnail: {
    maxHeight: 60,
    maxWidth: 60,
  },
}));

const validationSchema = Yup.object({
  titre: Yup.string()
    .max(50, "Le titre ne doit pas dépasser 20 caractères")
    .required("Champs Obligatoire"),
  sponsor: Yup.string()
    .max(50, "Le nom de la compagnie ne doit pas dépasser 50 caractères")
    .required("Champs Obligatoire"),
  type: Yup.string().required("Champs Obligatoire"),
});

export const Pubs = ({ className, cardProps, ...props }) => {
  const classes = useStyles();

  const [pubsRows, setPubRows] = useState([]);
  const [rows, setRows] = useState([]);

  // Update pub modal states and handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalActions = [
    {
      label: "Annuler",
      clickHandler: (e) => {
        setIsModalOpen(false);
      },
    },
  ];

  const openUpdatePub = (pubId) => {
   
    setPubToUpdate(rows.find(row=>row._id===pubId))
    setIsModalOpen(true);
  };
  const deletePub = (pubId) => {
    managerService.deletePub({ id: pubId, adminType: "manager" }).then(
      (res) => {
        setAlertProps({
          severity: "success",
          message: "Annonce supprimée avec succès",
        });
        setToasterOpen(true);
      },
      (err) => {
        console.log(err);
        setAlertProps({
          severity: "error",
          message: `Une erreur s'est produite ${
            err.message ? err.message : err
          }`,
        });
        setToasterOpen(true);
      }
    );
  };
  // console.log("User from the Redux State : ", user);
  const defaultState = {
    titre: "",
    sponsor: "",
    type: 1,
  };
  const [newPubState, setNewPubState] = useState(defaultState);
  const [pubToUpdate, setPubToUpdate] = useState(defaultState);
  const [progressValue, setProgressValue] = useState(0);
  const [imageName, setImageName] = useState("");
  const [currentFile, setCurrentFile] = useState(null);

  const inputChangeHandler = (file) => {
    console.log(file.file.name);
    setCurrentFile(file);
    // setImageName();
  };

  // Define notification state
  const [toasterOpen, setToasterOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({
    severity: "success",
    message: "Annonce ajoutée avec succès",
  });

  const closeToaster = () => setToasterOpen(false);

  const titreField = {
    type: "input",
    props: {
      name: "titre",
      required: true,
      type: "text",
      label: "Titre de l'annonce",
      value: newPubState.titre,
    },
  };
  const sponsorField = {
    type: "input",
    props: {
      name: "sponsor",
      required: true,
      type: "text",
      label: "Compagnie",
      value: newPubState.sponsor,
    },
  };
  const typeAdField = {
    type: "select",
    props: {
      name: "type",
      required: true,
      select: true,
      label: "Type de la banière publicitaire",
      value: newPubState.type,
    },
    children: [
      {
        key: 1,
        value: 1,
        label: "Type 1 : Petite annonce latérale",
      },
      { key: 2, value: 2, label: "Type 2 : Large annonce en bas" },
      { key: 3, value: 3, label: "Type 3 : Large annonce libre" },
    ],
  };
  useEffect(() => {
    managerService.getAllPubs({ adminType: "manager" }).then(
      (res) => {
        setRows(res.pubs);
      },
      (err) => {
        console.log("Error when fetching all pubs : ", err);
      }
    );
  }, []);

  useEffect(() => {
    console.log(rows);
    if (rows !== []) {
      setPubRows(
        rows.map((row) => ({
          ...row,
          thumbnail: (
            <Paper variant="outlined">
              <img
                src={row.image}
                alt="Lien d'annonce brisé"
                className={classes.thumbnail}
              />
            </Paper>
          ),
          actions: (
            <>
              <IconButton
                title="Modifier"
                color="primary"
                onClick={(e) => openUpdatePub(row._id)}
              >
                <Edit />
              </IconButton>
              <IconButton
                title="Supprimer"
                color="secondary"
                onClick={(e) => deletePub(row._id)}
              >
                <CancelIcon />
              </IconButton>
            </>
          ),
        }))
      );
    }
  }, [rows]);

  // Define the shape of the form
  const formStructure = [
    [titreField, sponsorField], // This is a row in the form grid
    [typeAdField],
  ];

  const resetStates = () => {
    setProgressValue(0);
    setNewPubState({
      titre: "",
      sponsor: "",
      type: "type1",
    });
    setCurrentFile(null);
    setImageName("");
  };

  // Define handlers
  const onUpload = () => {
    console.log("Updating...");

    //Update file (Change its state to uploading)
    setCurrentFile({
      ...currentFile,
      isUploading: true,
      progress: 0,
    });

    managerService
      .addPub(
        { ...newPubState, image: currentFile.file, adminType: "manager" },
        {
          onUploadProgress: (progressEvent) => {
            setProgressValue(
              (progressEvent.loaded / progressEvent.total) * 100
            );
          },
        }
      )
      .then(
        (res) => {
          // then print response status
          console.log(`Server result : ${res}`);

          console.log("File successfullly uploaded.");
          // Display notification snackbar toaster
          setTimeout(() => {
            setProgressValue(0);
          }, 3000);
          setAlertProps({
            severity: "success",
            message: "Annonce ajoutée avec succès",
          });
          setToasterOpen(true);
          resetStates();
        },
        (err) => {
          console.log(err);
          setAlertProps({
            severity: "error",
            message: `Une erreur s'est produite ${
              err.message ? err.message : err
            }`,
          });
          setToasterOpen(true);
        }
      );
  };

  const handleChange = (event) => {
    console.log(pubsRows);
    setNewPubState({
      ...newPubState,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (data) => {
    // Redux update action dispatch
    onUpload();
    console.log(data);
  };
  return (
    <Page className={classes.root} title="Espace Publicités">
      <Container maxWidth="lg">
        <ToasterSnackBar
          open={toasterOpen}
          onClose={closeToaster}
          autoHideDuration={6000}
          children={
            <Alert variant="filled" severity={alertProps.severity}>
              {alertProps.message}
            </Alert>
          }
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <CustomTable
                tableTitle={"Tables des annonces"}
                headCells={pubsHeadCells}
                rows={pubsRows}
                indexName={"_id"}
                withStartCheckbox={true}
                handleRowSelected={(e, n, defaultHandler) => {}}
                withActions={false}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Card
              //   className={clsx(classes.root, className)}
              {...cardProps}
            >
              <CardContent>
                <Box justifyContent="center" alignItems="center" display="flex">
                  <CardMedia image={"assets/Dummy/Avatars/avatar_4.png"}>
                    <Box
                      justifyContent="center"
                      alignItems="center"
                      display="flex"
                      flexDirection="column"
                      bgcolor="lightgrey"
                      className={classes.previewBox}
                    >
                      <Typography
                        align="center"
                        variant="h6"
                        color="textSecondary"
                      >
                        {newPubState.type === 1 && "Type 1"}
                        {newPubState.type === 2 && "Type 2"}
                        {newPubState.type === 3 && "Type 3"}
                      </Typography>
                      <Typography
                        align="center"
                        variant="h5"
                        color="textSecondary"
                      >
                        {newPubState.type === 1 && "365 X 720"}
                        {newPubState.type === 2 && "480 X 844"}
                        {newPubState.type === 3 && "560 X 1024"}
                      </Typography>
                    </Box>
                  </CardMedia>
                </Box>
              </CardContent>
              <Divider />
              <CardActions>
                <CustomUploadButton
                  name="upload-ad-image-input"
                  inputValue={imageName}
                  btnLabel="Charger la photo de l'annonce"
                  setParentInput={inputChangeHandler}
                  withProgress
                  // handleProgress={true}
                  // progressChangeHandler={(value)=>handleProgressChange(value)}
                  // clickhandler={(e)=> console.log(e.target)}
                  value={progressValue}
                />
              </CardActions>
            </Card>
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <Card>
              <CardHeader
                subheader="Veuillez remplir les champs indiqués"
                title="Ajouter une nouvelle annonce"
              />
              <Divider />
              <MuiThemeProvider theme={tinyTheme}>
                <CustomForm
                  validationSchema={validationSchema}
                  fieldsHiearchy={formStructure}
                  initialState={newPubState}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitLabel={"Ajouter"}
                />
              </MuiThemeProvider>
            </Card>
          </Grid>
        </Grid>
        <Grid container>
          <Modal
            open={isModalOpen}
            title={"Edition de publicité"}
            body={
              <UpdatePub
                className={className}
                cardProps={cardProps}
                oldPubProps={pubToUpdate}
                {...props}
              />
            }
            actions={modalActions}
            handleClose={(e) => setIsModalOpen(false)}
          />
        </Grid>
      </Container>
    </Page>
  );
};
export default Pubs;
