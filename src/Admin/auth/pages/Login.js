import React, { useState,createRef } from "react";
import {
  Avatar,
  Button,
  Typography,
  Container,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {grey} from "@material-ui/core/colors"
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouteLink,useNavigate } from "react-router-dom";

// Components
import ToasterSnackBar from "../../shared/notifiers/toaster/ToasterSnackBar";
import LoadingComponent from "../../shared/LoadingComponent";
 
// Redux
import { connect } from "react-redux";
import { ManagerActions as Actions } from "../../../redux/actions/";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: grey[400],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export function SignIn(props) {
  const navigator=useNavigate();


  const classes = useStyles();

  const [loginStatus, setLoginStatus] = useState(props.loginStatus);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isManager, setIsManager] = useState(false);

  const ButtonRef=createRef();

  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const toasterContent = (
    <Alert variant="filled" severity="error">
      Erreur d'authentification.   
      {props.loginStatus && props.loginStatus.message ? props.loginStatus.message: ""}
    </Alert>
  );
  const closeToaster = () => setAlertOpen(false);

  const handleChange = (e) => {
    if (e.target.name === "username") setUsername(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
    if (e.target.name === "adminCheckbox") setIsManager(e.target.checked);
  };


  const handleLogin = (e) => {
    e.preventDefault();
    setloading(true);
    props.login({ username, password, adminType: isManager?"manager":"enseignant" }).then(
      
      res=> { 
        if(res.type==='MANAGER_LOGIN_FAILED') {
        setAlertOpen(true);
        setloading(false);
      }
      else {
        console.log('success'); 
        e.returnValue = true;
        isManager && navigator('/');
        // isManager && navigator(-1);
        !isManager && navigator('/teacher');

      }
    },
      err=> {
       
      }
    );

  };
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToasterSnackBar
        open={alertOpen}
        onClose={closeToaster}
        autoHideDuration={6000}
        children={toasterContent}
      />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Authentification
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom d'utilisateur"
            name="username"
            value={username}
            onChange={handleChange}
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox name="adminCheckbox" value="remember" checked={isManager} color="primary" disabled={loading} onChange={handleChange}/>}
            label="Je suis un administrateur de l'application"
          />
          <LoadingComponent 
          component={<Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            component={RouteLink}
            to={"/"}
            onClick={handleLogin}
            disabled={loading}
            ref={ButtonRef}
          >
            Se connecter
          {/* {loading && <CircularProgress size={24} className={classes.buttonProgress} />} */}
          </Button>} 
          controller={loading}
          progressStyles={{color:"primary"}}
          />
          
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {return ({
  // loginStatus: state.managerReducer.loginStatus,
  loginStatus: state.adminReducer.status.loginStatus,
})};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => Actions.login(params).then((res) => dispatch(res)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
