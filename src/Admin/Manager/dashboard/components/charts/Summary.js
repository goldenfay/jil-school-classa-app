import React from 'react'
import PropTypes from 'prop-types'

import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { People as PeopleIcon, LocalLibrary,AttachMoney } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    redBg: {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
      borderRadius: "50%",
      padding: theme.spacing(2),
      fontSize: 60,
    },
    blueBg: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      borderRadius: "50%",
      padding: theme.spacing(2),
      fontSize: 60,
    },
    greenBg: {
      backgroundColor: theme.palette.success.main,
      color: "white",
      borderRadius: "50%",
      padding: theme.spacing(2),
      fontSize: 60,
    },
  }));
  

function Summary(props) {
    const classes = useStyles();
    return (
        <Grid container spacing={3} >
        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary">
            Quelques chiffres
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper height="100%" width="100%">
            <Grid container>
              <Grid item xs={12} sm={9}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                  p={5}
                >
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h6" color="textSecondary" align="center">
                      Total enseignants
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography variant="h4" color="primary">
                      4454
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  {" "}
                  <PeopleIcon
                    className={classes.redBg}
                    color="secondary"
                    fontSize="large"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper height="100%" width="100%">
            <Grid container>
              <Grid item xs={12} sm={9}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                  p={5}
                >
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h6" color="textSecondary" align="center">
                      Nombre d'élèves
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography variant="h4" color="primary">
                      4454
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  {" "}
                  <LocalLibrary
                    className={classes.blueBg}
                    fontSize="large"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper height="100%" width="100%">
            <Grid container>
              <Grid item xs={12} sm={9}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  width="100%"
                  p={5}
                >
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h6" color="textSecondary" align="center">
                      Total des abonnements
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Typography variant="h4" color="primary">
                      4454
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  {" "}
                  <AttachMoney
                    className={classes.greenBg}
                    fontSize="large"
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
}

Summary.propTypes = {
    summary: PropTypes.object.isRequired

}

export default Summary

