import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";

const useColorlibStepIconStyles = makeStyles((theme)=>({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    background: theme.palette.secondary.light,
      
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    background: theme.palette.primary.main,
      
  },
  form: {
    // width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sucess: {
    color: theme.palette.success.light
  },
  error: {
    color: theme.palette.error.light

  }
//   active: {
//     backgroundImage:
//       "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
//     boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
//   },
//   completed: {
//     backgroundImage:
//       "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
//   },
}));

const ColorlibConnector = withStyles((theme)=>({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
        background: theme.palette.primary.main,
    },
  },
  completed: {
    "& $line": {
        background: theme.palette.primary.main,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}))(StepConnector);

export { useColorlibStepIconStyles, ColorlibConnector };
