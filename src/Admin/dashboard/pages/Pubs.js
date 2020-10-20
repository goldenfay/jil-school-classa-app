import React, { useState,useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Button,
  Fab,
  IconButton,
  Paper,
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField,
} from "@material-ui/core";
import {
  CloudUpload as UploadIcon,
  Cancel as CancelIcons,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { MuiThemeProvider } from "@material-ui/core/styles";
import * as Yup from "yup";
import axios from "axios";


// components
import Page from "../components/Page";
import CustomForm from "../../shared/CustomForm";
import CustomUploadButton from "../../shared/CustomUploaderButton";
import CustomTable from "../../shared/tables/CustomTable";
import tinyTheme from "../../../themes/tinyTheme";
import ToasterSnackBar from "../../shared/notifiers/toaster/ToasterSnackBar";

// Data
import {
  pubsHeadCells as fakePubsHeadCells,
  pubsRows as fakePubsRows,
} from "../../../fake/fakePubs";

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
    .max(20, "Le nom de famille ne doit pas dépasser 20 caractères")
    .required("Champs Obligatoire"),
  sponsor: Yup.string()
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .required("Champs Obligatoire"),
  type: Yup.string().required("Champs Obligatoire"),
});

export const Pubs = ({ className, cardProps, ...props }) => {
  const classes = useStyles();

  const pubsRows = fakePubsRows.map((row) => ({
    titre: row.titre,
    sponsor: row.sponsor,
    thumbnail: (
      <Paper variant="outlined">
        <img
          src={row.adlink}
          alt="Lien d'annonce brisé"
          className={classes.thumbnail}
        />
      </Paper>
    ),
    actions: (
      <IconButton
        title="Supprimer"
        color="secondary"
        onClick={(e) => console.log("kfjhqdkfhdsfkjhdsfkjdhsf")}
      >
        <CancelIcons />
      </IconButton>
    ),
  }));
  // console.log("User from the Redux State : ", user);
  const [newPubState, setNewPubState] = useState({
    titre: "",
    sponsor: "",
    type: "type1",
  });
 
  const [previewImgLink, setPreviewImgLink] = useState("");
  const [progressValue,setProgressValue]=useState(0);
  const [imageName,setImageName]=useState('');
  const [currentFile,setCurrentFile]=useState(null);

  const inputChangeHandler=(file)=>{
    console.log(file.file.name);
    setCurrentFile(file);
    // setImageName();
  }
 
  // Define notification state
  const [toasterOpen, setToasterOpen] = useState(false);
  const [alertProps, setAlertProps] = useState({
    severity : "success",
    message: 'Annonce ajoutée avec succès'
  });
  const [toasterContent,setToasterContent] = useState((
    <Alert variant="filled" severity={alertProps.severity}>
      {alertProps.message}
    </Alert>
  ));
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
        key: "type1",
        value: "type1",
        label: "Type 1 : Petite annonce latérale",
      },
      { key: "type2", value: "type2", label: "Type 2 : Large annonce en bas" },
      { key: "type3", value: "type3", label: "Type 3 : Large annonce libre" },
    ],
  };

  // Define the shape of the form
  const formStructure = [
    [titreField, sponsorField], // This is a row in the form grid
    [typeAdField],
  ];

    const resetStates=()=>{
      setProgressValue(0);
      setNewPubState({
        titre:'',
        sponsor:'',
        type:'type1'
      })
      setCurrentFile(null);
      setImageName('')
    }

    // Define handlers
  const handleProgressChange=(value)=>  setProgressValue(value);
  const onUpload=()=> {
    
      console.log("Updating...");

      //Update file (Change its state to uploading)
      setCurrentFile({
        ...currentFile,
        isUploading: true,
        progress: 0,
      });
        //Send HHTP request
        //Simulate a REAL WEB SERVER DOING IMAGE UPLOADING
      // setTimeout(() => {
      //   setProgressValue(progressValue+10)
      // }, 3000);


        // Send files to Server
      const data = new FormData();
      data.append("file", currentFile.file);
      axios
        .post("http://localhost:4000/upload/coursefile", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            setProgressValue(progressEvent.loaded / progressEvent.total*100)
          },
        })
        .then(
          (res) => {
            // then print response status
            console.log(`Server result : ${res}`);
            if (res.status === 200) {
              console.log(res);
              console.log('File successfullly uploaded.')
              // Display notification snackbar toaster
              setTimeout(() => {
                setProgressValue(0);
              }, 3000);
              setAlertProps({
                severity : "success",
                message: 'Annonce ajoutée avec succès'
              });
            setToasterOpen(true);
            resetStates();

              // setNewPubState({})
              
            }
          },
          (err) =>{
            console.log(err);
            setAlertProps({
              severity:'error',
              message : `Une erreur s'est produite ${err.json}`
            })
            setToasterOpen(true);
            
          }
          
          );
          
          
  }
  
  const handleChange = (event) => {
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
          //  message={"Profile mis à jours avec succès"}
          children={<Alert variant="filled" severity={alertProps.severity}>
          {alertProps.message}
        </Alert>}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <CustomTable
                tableTitle={"Tables des annonces"}
                headCells={fakePubsHeadCells}
                rows={pubsRows}
                indexName={"sponsor"}
                withStartCheckbox={true}
                handleRowSelected={(e, n, defaultHandler) => {
                  defaultHandler(e, n);
                  console.log(n);
                }}
                withActions={false}
                //   actionButtons={actions}
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
                        {newPubState.type === "type1" && "Type 1"}
                        {newPubState.type === "type2" && "Type 2"}
                        {newPubState.type === "type3" && "Type 3"}
                      </Typography>
                      <Typography
                        align="center"
                        variant="h5"
                        color="textSecondary"
                      >
                        {newPubState.type === "type1" && "365 X 720"}
                        {newPubState.type === "type2" && "480 X 844"}
                        {newPubState.type === "type3" && "560 X 1024"}
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
      </Container>
    </Page>
  );
};
export default Pubs;
