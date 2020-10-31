import React, {createRef, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {  MenuItem } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";


const useStyles = makeStyles((theme) => ({
  
  form: {
    // width: "100%", // Fix IE 11 issue.
    margin: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CustomForm=React.forwardRef((props,ref)=> {
  const classes = useStyles();
  const submitBtnRef=useRef();

  useEffect(()=>{
    if(props.submitRefTracker) props.submitRefTracker(submitBtnRef);
  },[submitBtnRef])
 
  return (
    <Formik
      initialValues={props.initialState}
      validationSchema={props.validationSchema}
      enableReinitialize={props.reset?props.reset:true}
      onSubmit={props.onSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form className={classes.form}  onSubmit={(e)=>{e.preventDefault(); handleSubmit(e); }} ref={ref}>
          <Grid container spacing={2}>
            {props.fieldsHiearchy && props.fieldsHiearchy.map((gridRow,rowidx) => {
              if (!(gridRow instanceof Array)) {
                gridRow = [gridRow];
              }
              return gridRow.map((field,columnidx) => (
                <Grid item xs={12} sm={Math.floor(12 / gridRow.length)} key={`${rowidx}-${columnidx}`}>
                  {field.type === "input" && (
                    <TextField
                    key={field.props.name}
                      error={Boolean(touched[field.props.name] && errors[field.props.name])}
                      helperText={touched[field.props.name] && errors[field.props.name]}
                      onBlur={handleBlur}
                      onChange={(e)=> {handleChange(e);if(props.onChange) props.onChange(e)} }
                      variant="outlined"
                      fullWidth
                      id={`${field.props.name}-input`}
                      {...field.props}

                    />
                  )}
                  {field.type === "select" && (
                    <TextField 
                      error={Boolean(touched[field.props.name] && errors[field.props.name])}
                      helperText={touched[field.props.name] && errors[field.props.name]}
                      onBlur={handleBlur}
                      onChange={(e)=> {handleChange(e); if(props.onChange) props.onChange(e)} }
                      variant="outlined"
                      fullWidth
                      id={`${field.props.name}-input`}
                      {...field.props}
                    >
                      {field.children &&
                        field.children.map((option, idx) => (
                          <MenuItem key={option.key} value={option.value} >
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                  {field.type === "formControl" && (<>{field.children}</>)}
                </Grid>
              ));
            })}

            
          </Grid>
          {!props.noSubmit && (<Grid container justify="flex-end">
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                ref={submitBtnRef}
              >
                {props.submitLabel}
              </Button>
            </Grid>
          </Grid>)}
        </form>
      )}
    </Formik>
  );
})

CustomForm.propTypes = {
    submitLabel: PropTypes.string,
    validationSchema: PropTypes.object,
    fieldsHiearchy: PropTypes.array,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
  };



export default CustomForm
