import React from 'react'
import PropTypes from 'prop-types'
import {CircularProgress,Box,Container} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"


const useStyles = makeStyles((theme) => ({
    container:{
      height: "100%",
      minHeight: 300
    },
    box:{
      height: "100%",
      width: "100%",
    },
   
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
        <Container className={classes.container}>
        {/* <div> */}
            {props.controller && 
            <Box display="flex" className={classes.container} alignContent="center" alignItems="center" justifyContent="center">
                <CircularProgress  className={classes.buttonProgress}  {...props.progressStyles}/>
            </Box>
            
            }
            {!props.controller && props.component}

            
        {/* </div> */}
        </Container>
    )
}

LoadingComponent.propTypes = {
    controller: PropTypes.bool.isRequired,
    component: PropTypes.node.isRequired


}

export default LoadingComponent

