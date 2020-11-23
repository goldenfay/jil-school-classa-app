import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import {red} from "@material-ui/core/colors"
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx"
import * as Yup from "yup";
import { Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
  },
  grid: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(3),
  },
  invalidQuestion: {
    backgroundColor: red[100]
  },
  typography: {
    fontWeight: "bold",
  },
  uploadLabel: {
    display: "inline-block",
    backgroundColor: "indigo",
    boxShadow: theme.shadows[10],
    color: "white",
    padding: "0.5rem",
    cursor: "pointer",
  },
}));

const validationSchema = Yup.object({
  questionText: Yup.string()
    .min(5, "Le contenu de la question doit contenir au minimum 5 caractères"),
  answerText: Yup.string()
    
});
function QuizQuestion(props) {
  const classes = useStyles();

  const { questionText, questionImg, answerText, answerImg } = props.question;
  const {valid}=props;
    // States
  const [state, setState] = useState({
    questionText,
    questionImg,
    answerText,
    answerImg,
  });
   

  const [questIsImg, setQuestionIsImg] = useState(false);
  const toggleQuestType = () => setQuestionIsImg(!questIsImg);

  const [answerIsImg, setAnswerIsImg] = useState(false);
  const toggleAnswerType = () => setAnswerIsImg(!answerIsImg);

  /**
   * Handle Question/Answer image loading
   * @param {*} e event
   * @param {*} name name of the field to update the state according to
   */
  const handleLoadImg = (e, name) => {
    const file = e.currentTarget.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileToAdd = {
        file: file,
        data: fileReader.result,
        isUploading: false,
        progress: 0,
      };
      const changesObj={
        ...state,
        [name]: fileToAdd,
      };
      setState(changesObj);

      if (props.updateState) props.updateState(changesObj);
    };
    fileReader.onabort = () => {
      alert("Reading Aborted");
    };
    fileReader.onerror = () => {
      console.log("Error occuren when Uploading file from disk");
    };

    fileReader.readAsDataURL(file);
  };

  const onBlurHandler = (event) => {
    const changesObj={
      ...state,
      [event.target.name]: event.target.value,
    };
    setState(changesObj);

    if (props.updateState) props.updateState(changesObj);
  };

  const onSubmitHandler=(data)=>{

  }

  return (
    <Container>
      <Paper className={clsx(classes.paper,!valid && classes.invalidQuestion)}>
        <Typography variant="body1">
          Question n ° {props.numQuestion}
        </Typography>
        <Formik
          initialValues={{questionText,answerText}}
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

                {/* QUESTION SECTION */}
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    width="100%"
                  >
                    <Container>
                      <Box display="flex" width="100%">
                        <Box display="flex" width="50%" alignItems="center">
                          <Typography variant="body1">Question</Typography>
                        </Box>
                        <Box display="flex" width="50%">
                          <FormGroup row>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={!questIsImg}
                                  onChange={() => toggleQuestType()}
                                  name="questTypeSwitch"
                                  color="primary"
                                />
                              }
                              label={questIsImg?"Image":"Textuelle"}
                            />
                          </FormGroup>
                        </Box>
                      </Box>
                    </Container>

                    <Container>
                      {questIsImg && (
                        <Container>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                          >
                            <input
                              type="file"
                              id={`questionImg-${props.numQuestion}`}
                              name="questionImg"
                              hidden
                              accept="image/png, image/jpeg"
                              
                              onChange={(e) => handleLoadImg(e, "questionImg")}
                            />
                            <label
                              htmlFor={`questionImg-${props.numQuestion}`}
                              className={classes.uploadLabel}
                            >
                              Charger
                            </label>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                          >
                            {state.questionImg &&
                              state.questionImg !== null && (
                                <img
                                  src={state.questionImg.data}
                                  alt="Aperçu de la question"
                                  width={70}
                                  height={70}
                                />
                              )}
                          </Box>
                        </Container>
                      )}
                      {!questIsImg && (
                        <Container>
                          <TextField
                            error={Boolean(touched.questionText && errors.questionText)}
                            helperText={touched.questionText && errors.questionText}
                            onBlur={(e)=>{handleBlur(e); onBlurHandler(e); }}
                            // value={state.questionText}
                            onChange={handleChange}
                            // value={state.questionText}
                            variant="outlined"
                            fullWidth
                            multiline
                            label="Text de la question"
                            name="questionText"
                          />
                        </Container>
                      )}
                    </Container>
                  </Box>
                </Grid>




                {/* ANSWER SECTION */}
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    width="100%"
                  >
                    <Container>
                      <Box display="flex" width="100%">
                        <Box display="flex" width="50%" alignItems="center">
                          <Typography variant="body1">Réponse</Typography>
                        </Box>
                        <Box display="flex" width="50%">
                          <FormGroup row>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={!answerIsImg}
                                  onChange={() => toggleAnswerType()}
                                  name="answerTypeSwitch"
                                  color="secondary"
                                />
                              }
                              label={answerIsImg?"Image":"Textuelle"}
                            />
                          </FormGroup>
                        </Box>
                      </Box>
                    </Container>

                    <Container>
                      {answerIsImg && (
                        <Container>
                         
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            width="100%"
                          >
                            <input
                              type="file"
                              id={`answerImg-${props.numQuestion}`}
                              name="answerImg"
                              hidden
                              accept="image/png, image/jpeg"
                              onChange={(e) => handleLoadImg(e, "answerImg")}
                            />
                            <label
                              htmlFor={`answerImg-${props.numQuestion}`}
                              className={classes.uploadLabel}
                            >
                              Charger
                            </label>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="center"
                            width="100%"
                          >
                            {state.answerImg &&
                              state.answerImg !== null && (
                                <img
                                  src={state.answerImg.data}
                                  alt="Aperçu de la question"
                                  width={70}
                                  height={70}
                                />
                              )}
                          </Box>
                        </Container>
                      )}
                      {!answerIsImg && (
                        <Container>
                          <TextField
                            error={Boolean(touched.answerText && errors.answerText)}
                            helperText={touched.answerText && errors.answerText}
                            onBlur={(e)=>{handleBlur(e); onBlurHandler(e); }}
                            // value={state.answerText}
                            onChange={handleChange}
                            // value={state.answerText}
                            variant="outlined"
                            fullWidth
                            multiline
                            label="Text de la réponse"
                            name="answerText"
                          />
                        </Container>
                      )}
                    </Container>
                  </Box>
                </Grid>

                {/* CONFIRM SECTION */}
                {/* <Grid item xs={12} sm={2}>
                <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      >
                        Confimer
                      </Button>

                </Grid> */}
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
    
  );
}

QuizQuestion.propTypes = {
  numQuestion: PropTypes.number.isRequired,
};

export default QuizQuestion;
