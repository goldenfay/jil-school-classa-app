import React, { useState, useEffect, useRef,createRef } from "react";
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
// Components
import CustomUploadButton from "../../../../../shared/CustomUploaderButton";

const validationSchema = Yup.object({
  titrePdf: Yup.string()
    .min(5, "Le titre du document doit contenir au minimum 5 caractères")
    .max(40, "Le titre du document ne doit pas dépasser 40 caractères")
    .required('Champs Obligatoire'),
});

const titre = {
  type: "input",
  props: {
    name: "titrePdf",
    required: false,
    type: "text",
    label: "Titre de document",
  },
};
const document = {
  type: "file",
  props: {
    name: "document",
    type: "file",
    accept: "application/pdf"
    // required: true
  },
};

function AjouterDocument(props) {
  const { classes } = props;
  const initialState = {
    titrePdf: props.state.titrePdf!==""?props.state.titrePdf:"",
    pdfFile: props.state.pdfFile!==null?props.state.pdfFile:null,
    DOC: props.state.pdfFile!==null?props.state.pdfFile.file.name:""
  };
  const labelRef=createRef();

  const [uploadRequired, setUploadRequired] = useState(false);
  const [state, setState] = useState({
    ...initialState,
  });
  titre.props.value=state.titrePdf;
  document.children = (
    <CustomUploadButton
      btnLabel="Charger"
      btnColor={"primary"}
      name="document"
      // inputValue=""
      inputProps={document.props}
      value={0}
      setParentInput={(file) => setState({ ...state, pdfFile: file,DOC: file.file.name })}
    />
  );
  const formStructure=[
        [titre],
        [
          {
            type: "formControl",
            children: (
              <Grid container>
                <Grid item xs={12} sm={4}>
                  <label ref={labelRef}>Choisissez le fichier</label>
                </Grid>
                <Grid item xs={12} sm={4}>
                  {document.children}
                </Grid>
              </Grid>
            ),
          },
          {
            type: "formControl",
          },
        ],
      ];
  const formRef = useRef();
  useEffect(() => {
    if (props.linkRefHandle) props.linkRefHandle(formRef, 1);
  }, [formRef]);

  useEffect(() => {
    console.log("State updated on Resume",state);
  }, [state]);

  const onChangeHandler = (event) => {
    if (event.target.name === "titrePdf" && event.target.value !== "")
      setUploadRequired(true);
    if (event.target.name === "titrePdf" && event.target.value === "") {
      setUploadRequired(false);
    }
    setState({
      ...state,
      [event.target.name]: event.target.value
    });

    if(props.updateStepsStatus) props.updateStepsStatus(1);
  };

  const onSubmitHandler = (data) => {
    console.log(data)
    if (uploadRequired && state.pdfFile === null) {
      return;
    }
    props.submitHandler({ ...data, pdfFile: state.pdfFile }, 1);
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Associer un document au cours
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
                            onChange={(e) => {
                              handleChange(e);
                              onChangeHandler(e);
                            }}
                            variant="outlined"
                            fullWidth
                            id={`${field.props.name}-input`}
                            {...field.props}
                          />
                        )}
                        {/* {field.type === "formControl" && (<>{field.children}</>)} */}
                      </Grid>
                    ));
                  })}

                  <Grid item xs={12} sm={4}>
                  <label ref={labelRef} style={{color: uploadRequired && state.pdfFile===null?"red":"inherit"}}>
                    {state.DOC!==""?state.DOC: "Choisissez un fichier"}
                  </label>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                  {document.children}
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
                      style={{ visibility: "hidden" }}
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

AjouterDocument.propTypes = {
  classes: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default AjouterDocument;
