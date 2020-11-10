import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function CustomModal(props) {
  const [open, setOpen] = React.useState(props.open);

  useEffect(()=>{
      setOpen(props.open)

  },[props.open])
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      
      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={open} maxWidth="lg" fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          {props.title}
        </DialogTitle>
        <DialogContent dividers>
          {props.body}
        </DialogContent>
        <DialogActions>
          {props.actions && props.actions.map((action)=><Button autoFocus onClick={action.clickHandler} color="primary">
            {action.label}
          </Button>)}
        </DialogActions>
      </Dialog>
    </div>
  );
}

CustomModal.prototype={
    open: PropTypes.bool.isRequired,
    title: PropTypes.any.isRequired,
    body: PropTypes.any.isRequired
}


export default  CustomModal


