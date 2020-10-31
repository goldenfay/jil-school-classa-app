import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { StepContent } from "@material-ui/core";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function ColorlibStepIcon({ icons, classes, ...props }) {
  //   const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,

  completed: PropTypes.bool,

  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.success.contrastText
  },
}));

function CustomStepper({
  StepConnector,
  labelStepsIconsClasses,
  icons,
  steps,
  ...props
}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(2);

  const handleNext = () => {
    const feedBack=(props.nexHandler ? props.nexHandler(activeStep): true);
    if(feedBack) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<StepConnector />}
      >
        {steps.map((step) => (
          <Step key={step.title}>
            <StepLabel
              StepIconComponent={(props) => (
                <ColorlibStepIcon classes={labelStepsIconsClasses} icons={icons} {...props}/>
              )}
              
            >
              {step.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
          {activeStep !== steps.length && steps[activeStep].children}

      </div>
      <div>
        {activeStep === steps.length ? (
          <div>
            {!props.finalStep && (<Typography className={classes.instructions}  align="center">
              C'est fini ! Toutes les étapes sont accomplies
            </Typography>)}
            {props.finalStep && props.finalStep}
            <Button onClick={handleReset} className={classes.button}>
              Réinitialiser
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                {...props.backBtnIcon}
              >
                Précédent
              </Button>
              {activeStep !== steps.length - 1 && (<Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                {...props.nextBtnIcon}
                
              >
                Suivant
              
              </Button>)}
              {activeStep === steps.length - 1 && (<Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                
              >
                Terminer
              
              </Button>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
CustomStepper.prototype = {
  steps: PropTypes.array.isRequired,
  labelStepsIconsClasses: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired,
};

export default CustomStepper;
