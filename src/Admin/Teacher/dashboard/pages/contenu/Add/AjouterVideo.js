
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  CssBaseline,
  Button,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";

const validationSchema = Yup.object({
  titre: Yup.string()
    .min(5, "Le titre du cours doit contenir au minimum 5 caractères")
    .max(20, "Le titre du cours ne doit pas dépasser 20 caractères")
    .required("Champs Obligatoire"),
  lien: Yup.string()
    .url("Le lien de la vidéo est invalide")
    .matches(/https:\/\/vimeo.com\/\d{8,}(?=\b|\/)/, "L'URL de la vidéo semble invalide")
    .required("Champs Obligatoire"),
  thumbnail: Yup.string()
    .url("Le lien de l'aperçu la vidéo est invalide")
    .required("Champs Obligatoire"),
});

const titreField = {
  type: "input",
  props: {
    name: "titre",
    required: true,
    type: "text",
    label: "Titre du cours",
  },
};
const lienField = {
  type: "input",
  props: {
    name: "lien",
    required: true,
    type: "text",
    label: "URL de la vidéo",
  },
};
const thumbnailField = {
  type: "input",
  props: {
    name: "thumbnail",
    required: true,
    type: "text",
    label: "URL de l'aperçu de la vidéo",
  },
};

function AjouterVideo(props) {
  const { classes } = props;
  // const { titre, lien, thumbnail } = props.state;
  const formRef = useRef();
  useEffect(() => {
    if (props.linkRefHandle) props.linkRefHandle(formRef,0);
  }, [formRef]);

  const initialState = {
    titre: props.state.titre,
    lien: props.state.lien,
    thumbnail: props.state.thumbnail,
  };

  const [state, setState] = useState({
    ...initialState,
    // thumbnail: props.state.thumbnail,
  });
  const [preview, setpreview] = useState(false);
    // Update fields initial values if they already filled before
  if (props.withTitle) titreField.props.value = state.titre;
  lienField.props.value = state.lien;
  thumbnailField.props.value = state.thumbnail;
  // Define form hiearchy
  const formStructure=(props.withTitle ? [[titreField]] : []).concat([
      [lienField],
      [thumbnailField],
    ]);

  const onChangeHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    if(props.updateStepsStatus) props.updateStepsStatus(0);
  };

  const onSubmitHandler = (data) => {
    setState({ ...state, ...data });
    props.submitHandler(data, 0);
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ajouter la vidéo du cours
        </Typography>
        <Paper>
          <Formik
            initialValues={state}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {formStructure.map((gridRow, rowidx) => {
                    return gridRow.map((field, columnidx) => (
                      <Grid
                        item
                        xs={12}
                        sm={Math.floor(12 / gridRow.length)}
                        key={`${rowidx}-${columnidx}`}
                      >
                        {field.type === "input" && (
                          <TextField
                            key={field.props.name}
                            error={Boolean(
                              touched[field.props.name] &&
                                errors[field.props.name]
                            )}
                            helperText={
                              touched[field.props.name] &&
                              errors[field.props.name]
                            }
                            onBlur={handleBlur}
                            onChange={(e)=> {handleChange(e); onChangeHandler(e)}}
                            variant="outlined"
                            fullWidth
                            id={`${field.props.name}-input`}
                            {...field.props}
                          />
                        )}
                      </Grid>
                    ));
                  })}
                  <Grid item xs={12} sm={4}>
                    <Button 
                    color="secondary"
                    variant="contained"
                    onClick={()=> setpreview(true)}
                    > Aperçu

                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={8}>

{preview && (<div> 
  <div><iframe title="aperç"src={state.lien.replace('vimeo.com','player.vimeo.com/video')} width="240" height="160" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe> </div>
  {/* <div><img src={videoLink.thumbnail} alt="display it" />  </div> */}
  </div>)}

                  </Grid>

  
                </Grid>
                <Grid container justify="flex-end">
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      style={{visibility: "hidden"}}
                      ref={formRef}

                    ></Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Paper>
      </div>
    </Container>
  );
}

AjouterVideo.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
  withTitle: PropTypes.bool,
};

export default AjouterVideo;
