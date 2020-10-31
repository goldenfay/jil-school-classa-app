import React from 'react'
import PropTypes from 'prop-types'
import {Avatar,Box,Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

// utils
import {getInitials} from "../../utils/functions"

const useStyles = makeStyles((theme) => ({
  box:{
    marginBottom: theme.spacing(2)

  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main
  }
}));


function ProfileAvatar(props) {
    const {avatar,firstname,lastname,descriptionTitle}=props
    const classes=useStyles();
    return (
        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={props.classes? props.classes.avatar : classes.avatar}
            src={avatar}
            color={"secondary"}
          > {getInitials(`${firstname} ${lastname}`)}
            </Avatar>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
          >
            {`${firstname} ${lastname}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {descriptionTitle}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
          </Typography>
        </Box>
    )
}

ProfileAvatar.propTypes = {
    avatar: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    descriptionTitle: PropTypes.string

}

export default ProfileAvatar

