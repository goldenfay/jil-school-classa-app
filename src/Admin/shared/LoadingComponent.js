import React,{createRef,useEffect,useRef} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import {CircularProgress,Box} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {grey,blue} from "@material-ui/core/colors"


const useStyles = makeStyles((theme) => ({
   
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
    
    buttonProgress: {
    //   color: grey[400],
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
      height: "50%",
    //   marginTop: "-25%",
    //   marginLeft: "-25%",
    },
  }));
function LoadingComponent(props) {
    const classes=useStyles();
 
   
  
    return (
        <div>
        <div>
            {props.controller && 
            <Box display="flex" width="100%" height="100%" alignContent="center" alignItems="center" justifyContent="center">
                <CircularProgress  className={classes.buttonProgress}  {...props.progressStyles}/>
            </Box>
            
            }
            {!props.controller && props.component}

            
        </div>
        </div>
    )
}

LoadingComponent.propTypes = {
    controller: PropTypes.bool.isRequired,
    component: PropTypes.node.isRequired


}

export default LoadingComponent

