
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
  MenuItem
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";
import teacherService from "../../../../../../services/teacherServices";
// Redux
import { connect } from "react-redux";

const validationSchema = Yup.object({
  titre: Yup.string()
    .min(5, "Le titre du cours doit contenir au minimum 5 caractères")
    .max(70, "Le titre du cours ne doit pas dépasser 70 caractères")
    .required("Champs Obligatoire"),
  trimestre: Yup.number()
    .integer()
    .oneOf([1,2,3])
    .required("Champs Obligatoire"),
  ordre: Yup.number()
    .integer()
    .positive()
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
const trimestreField= {
  type: "select",
  props: {
    name: "trimestre",
    required: true,
    select: true,
    label: "Trimestre",
  },
  children: [1,2,3].map((item) => ({
    key: item,
    value: item,
    label: item,
  })),
}
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
    trimestre: props.state.trimestre,
    ordre: props.state.ordre,
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
  trimestreField.props.value = state.trimestre;
  thumbnailField.props.value = state.thumbnail;
  // Define form hiearchy
  const [formStructure,setFormStructure]=useState([]);
  
  useEffect(()=>{
    teacherService.getProfCourses({adminType: "enseignant", id:props.user._id}).then(
      res=>{
        console.log(res);
        const actualClassCourses=res.courses.filter(cours=>cours.classe===props.currentClasse)
        const index=props.withTitle ? 1:0
        const dup=formStructure;
        setFormStructure((props.withTitle ? [[titreField]] : []).concat([
          [trimestreField,{
            type: "select",
            props: {
              name: "ordre",
              required: true,
              select: true,
              label: "Ce cours est placé après",
              value: actualClassCourses.length?actualClassCourses[0].ordre:0
            },
            children: actualClassCourses.map((item) => ({
              key: item._id,
              value: item.ordre,
              label: item.titre,
            })),
          }],
          [lienField],
          [thumbnailField],
        ]))
       

      },
      err=>{
        console.log('an error occured when fetching courses of the professor: ',err)

      }
    )

  },[])  

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
                        {field.type === "select" && (
                    <TextField 
                      error={Boolean(touched[field.props.name] && errors[field.props.name])}
                      helperText={touched[field.props.name] && errors[field.props.name]}
                      onBlur={handleBlur}
                      onChange={(e)=> {handleChange(e); if(props.onChange) props.onChange(e)} }
                      variant="outlined"
                      fullWidth
                      id={`${field.props.name}-input`}
                      {...field.props}
                    >
                      {field.children &&
                        field.children.map((option, idx) => (
                          <MenuItem key={option.key} value={option.value} >
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
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

const mapStateToProps = (state) => ({
  user: state.adminReducer.user,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AjouterVideo);

