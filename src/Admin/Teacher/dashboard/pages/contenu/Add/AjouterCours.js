import React, {createRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {PictureAsPdf as PDFIcon, 
    Movie as MovieIcon,
    LiveHelp as LiveHelpIcon,
    ArrowBackIos as BackIcon,
    ArrowForwardIos as NextIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon

} 
    from "@material-ui/icons"
import {Box, Grid, Typography} from "@material-ui/core"

// Styles
import {useColorlibStepIconStyles,ColorlibConnector} from './styles'



// Components
import CustomStepper from "../../../../../shared/CustomStepper"
import AjouterVideo from './AjouterVideo'
import AjouterDocument from './AjouterResume'
import AjouterQuiz from './AjouterQuiz'

// Services
import TeacherService from '../../../../../../services/teacherServices'


const icons={
    1: <MovieIcon/>,
    2: <PDFIcon/>,
    3: <LiveHelpIcon/>,
    
}
const steps=[
    {
        title: 'Contenu principale',
    },
    {
        title: 'Résumé du cours',
    },
    {
        title: 'Quiz',
    },
    
    
]

function AjouterCours(props) {
    const stepIconStyles=useColorlibStepIconStyles();
    const classes=stepIconStyles;

    const [registerCourseFeedback,setregisterCourseFeedback]=useState((
        < >
        </>
    ))
    const defaultState={
        titre:'',
        ordre: 1,
        trimestre: 1,
        lien:'',
        thumbnail: '',
        titrePdf:'',
        pdfFile:null,
        questionsList: []
        
    }
    const [globalState,SetGlobalState]=useState(defaultState);
    // Only for test
    // useEffect(()=>{
    //     console.log("Global State changed. Here's the updated version : ",globalState)

    // },[globalState])

    const [stepsPassed,setStepsPassed]=useState([false,false,false]);
    
    
    const [addVideoRef,setaddVideoRef]=useState(createRef());
    const [addResumeRef,setaddResumeRef]=useState(createRef());
    const [addQuizRef,setaddQuizRef]=useState(createRef());
    
    /**
     * Link the Submit button Ref to this state
     * @param {*} ref Step submit button Reference
     * @param {*} step Step number
     */
    const linkRefHandle=(ref,step)=>{
        if(step===0) setaddVideoRef(ref);
        if(step===1) setaddResumeRef(ref);
        if(step===2) setaddQuizRef(ref);
        
    }

    const submitRefHandle=(ref)=>{
        setaddVideoRef(ref);
        
    }
    /**
     * Turn the passed step to invalid, after changind any field of its form.
     * @param {*} step Step number
     */
    const updateStepsStatus=(step)=> setStepsPassed(stepsPassed.map((val,idx)=> step===idx?false:val )) ;
    
    const validateStep=(step)=>{
        if(step===2 && stepsPassed.filter(el=> el===true).length===3){
            // console.log('Sending cours ...');
            
            // console.log("Questions List : ",globalState.questionsList);
            TeacherService.addNewCourse({
                adminType: "enseignant",
                ...globalState,
                matiere: props.teacher.matiere._id,
                classe: props.currentClasse,
                ordre: globalState.ordre+1,
                video: globalState.lien,
                pdf: globalState.pdfFile.file,
                enseignant: props.teacher.id,
                
            }).then(
                res=>{
                    setregisterCourseFeedback((
                        < >
                            <SuccessIcon className={classes.sucess} fontSize="large"  />
                            <Typography className={classes.sucess} variant="body1" >Cours enregistré avec succès.</Typography>
                        </>
                    ));

                    if(props.onApprendNewCours)
                        props.onApprendNewCours(res.newCours)


                    SetGlobalState(defaultState)

                },
                err=>{
                    console.log(err)
                    setregisterCourseFeedback((
                        < >
                            <ErrorIcon fontSize="large" className={classes.error}  />
                            <Typography className={classes.error}  variant="body1" >Une erreur s'est produite. Impossible d'ajouter le cours.</Typography>
                                    <p>{(err.message && err.message)|| err}</p>
                        </>
                    ))

                }
            )
            
            return stepsPassed[step];
        }
        if(step===0) addVideoRef.current.click()
        if(step===1) addResumeRef.current.click()
        if(step===2) addQuizRef.current.click()
       
        return stepsPassed[step];
    }
    
    const updateState=(state,step)=>{
        SetGlobalState({
            ...globalState,
            ...state
        });
        setStepsPassed(stepsPassed.map((val,idx)=> val || step===idx ))
        
     
        return true;
        
    }
    
    const wrapper=(component)=>(
        <Grid container spacing={3}>
            {component}
            </Grid>
    )
        //Define each step Component
    steps[0].children= (wrapper(<AjouterVideo withTitle 
        state={globalState} linkRefHandle={linkRefHandle} 
        updateStepsStatus={updateStepsStatus} submitRefTracker={submitRefHandle} 
        classes={classes} 
        currentClasse={props.currentClasse}
        submitHandler={updateState}
        />))
    steps[1].children= (wrapper(<AjouterDocument  
        state={globalState} linkRefHandle={linkRefHandle} 
        updateStepsStatus={updateStepsStatus} 
        classes={classes} 
        submitHandler={updateState}
        />))
    steps[2].children= (wrapper(<AjouterQuiz  
        state={globalState} linkRefHandle={linkRefHandle} 
        updateStepsStatus={updateStepsStatus} 
        classes={classes} 
        submitHandler={updateState}
        />))

    return (
        <div>
            <CustomStepper  
            StepConnector={ColorlibConnector} 
            labelStepsIconsClasses={stepIconStyles} 
            icons={icons}
            steps={steps}
            nextBtnIcon={{endIcon:(<NextIcon/>)}}
            // nexHandler={(step)=>(stepsPassed[step]===true) }
            nexHandler={(step)=> validateStep(step) }
            backBtnIcon={{startIcon:(<BackIcon/>)}}
            finalStep={<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{minHeight: "100px"}}>
                {registerCourseFeedback}

            </Box>}
            />
            
        </div>
    )
}

AjouterCours.propTypes = {
    currentClasse: PropTypes.string.isRequired

}

export default AjouterCours

