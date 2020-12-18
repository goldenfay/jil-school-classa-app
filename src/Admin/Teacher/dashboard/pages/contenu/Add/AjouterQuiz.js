import React, { useState,useEffect,useRef } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Grid,
  CssBaseline,
  Button,
  Typography,
  Slider,
} from "@material-ui/core";
import {
  FormGroup,
} from "@material-ui/core";
import * as Yup from "yup";
import { Formik } from "formik";

// import {Vimeo} from "vimeo"

// Components
import QuestionComponent from './QuizQuestion'

const validationSchema = Yup.object({
  titre: Yup.string()
    .min(5, "Le titre du document doit contenir au minimum 5 caractères")
    .max(20, "Le titre du document ne doit pas dépasser 20 caractères"),
});


const makeEmptyArray=(size)=>[...Array(size).keys()].map((el)=>({
  question: {
  questionText: "",
  questionImg: null,
  answerText: "",
  answerImg: null,},
  valid: true
})); 

// const client = new Vimeo("6a9e2c0bbf4de91ba3b36aabdc35372bfcec1566", "wJ3RSrdsVd3WeGxRTLF6K94zkBtHy94OHYUi03QYznbcxHAmWzvtOLaSIoWKpKkwHJSTHLev6mB1E773Lq73ku615od3RR2m5HU2tDHUO9x3kn3ODY7EDXN7yYAqiRKU", "0c7176360df3d2c0e47b48f87a3fb7ba");
function AjouterQuiz(props) {
  // const [videoLink,setVideolink]=useState({});
  useEffect(()=>{
    
  //   client.request({
  //   method: 'GET',
  //   path: '/me/videos/473470147',
  // //   headers: {
  // //     Authorization: `basic base64_encode(6a9e2c0bbf4de91ba3b36aabdc35372bfcec1566:wJ3RSrdsVd3WeGxRTLF6K94zkBtHy94OHYUi03QYznbcxHAmWzvtOLaSIoWKpKkwHJSTHLev6mB1E773Lq73ku615od3RR2m5HU2tDHUO9x3kn3ODY7EDXN7yYAqiRKU)`,
  // //     'Content-Type': 'application/json',
  // //     Accept: 'application/vnd.vimeo.*+json;version=3.4'
  // //   },
  // //   body: {
  // //     "grant_type": "client_credentials",
  // // "scope": "private"
  // //   }
    
  // }, function (error, body, status_code, headers) {
  //   if (error) {
  //     console.log(error);
  //   }
  
  //   console.log("BODY : ",body);
  //   setVideolink({link: body.link, html: body.embed.html,thumbnail: body.pictures.sizes[1].link})
  //   // videoLink.link=body.link
  //   // videoLink.html=body.embed.html
  // })
    




},[])
    // Styles
  const { classes } = props;
    // Refs
  const formRef = useRef();
  useEffect(() => {
    if (props.linkRefHandle) props.linkRefHandle(formRef, 2);
  }, [formRef]);
  
  
  // States
  const initialState = {
    questionsList: props.state.questionsList.length>0
      ? props.state.questionsList.map((el)=>({question: el, valid: true}))
      : makeEmptyArray(10)
      
  };
  const [state, setState] = useState({
    ...initialState,
  });
  const updateState=(data,questIndex)=>{

    setState({
      ...state,
      questionsList: state.questionsList.map((el,idx)=> idx!==questIndex?el: {
        ...el,
        question: data
      } )
    })


  }


  const updateQuestList = (size) => {
    if (size>state.questionsList.length)
      setState({
        ...state,
        questionsList: [...state.questionsList,...makeEmptyArray(size-state.questionsList.length)]
      })
    else if (size<state.questionsList.length)
      setState({
        ...state,
        questionsList: state.questionsList.slice(0,size)
      })

  };

  
  const onSubmitHandler = (e) => {
    const changes=state.questionsList.map((el)=>({
      ...el,
      valid: !((el.question.questionText==="" && el.question.questionImg===null) ||  (el.question.answerText==="" && el.question.answerImg===null))
    }));
    
    setState({
      questionsList: changes
    });
    const failFlag=changes.find(el=> el.valid===false);

    if(failFlag) return;

    props.submitHandler({ 
      questionsList: state.questionsList.map((el)=> el.question)
     }, 2);
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Associer un Quiz au cours
        </Typography>

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
                <FormGroup row>
                  
                    
                    <label>Spécifiez le nombre de question de ce Quiz</label>
                  
                  <Slider
                        defaultValue={10}
                        aria-labelledby="nbr-quest-slider"
                        step={1}
                        marks
                        min={5}
                        max={30}
                        valueLabelDisplay="on"
                        onChange={(e,v)=>updateQuestList(v)}
                      />
                </FormGroup>

              </Grid>
            </form>
          )}
        </Formik>
                <Grid item xs={12}>
                  {state.questionsList.map((question,idx)=> (
                  <QuestionComponent 
                  key={idx} 
                  numQuestion={idx+1}
                  question={question.question}
                  valid={question.valid} 
                  updateState={(data)=>updateState(data,idx)} />))}

                </Grid>  
                <Grid item xs={12} sm={2}>
                <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      ref={formRef}
                      onClick={onSubmitHandler}
                      style={{display: "none"}}
                      >
                      </Button>

                </Grid>
      </div>
     
    </Container>
  );
}
AjouterQuiz.propTypes = {
  classes: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired,
};

export default AjouterQuiz;
