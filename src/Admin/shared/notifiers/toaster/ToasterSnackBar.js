import React ,{useState}from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";
import {Slide,Fade,Grow} from '@material-ui/core';

const defaultTransition=(props)=> <Slide {...props}  direction="up" />;
const defaultClosehandler=()=> {}
function ToasterSnackBar({children,...props}) {
    // const [open,setOpen]=useState(typeof props.open ==="undefined" ? true:props.open)
  return (
    <Snackbar
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={defaultTransition}
    //   message={props.message || ''}
      key={props.Transition ? props.Transition.name : "defaultTransition.key"}
      {...props}
    >
        {children}

    </Snackbar>
  );
}

ToasterSnackBar.propTypes = {};

export default ToasterSnackBar;
