import React, { useState } from "react";
import PropTypes from "prop-types";
import { Fab, Box, LinearProgress, Typography } from "@material-ui/core";

function CustomUploaderButton({
  name,
  inputValue,
  id,
  btnColor,
  btnLabel,
  btnSize,
  setParentInput,
  clickhandler,
  handleProgress,
  withProgress,
  ...props
}) {
  const [input, setInput] = useState(null);

  const handleUploadClick = (e) => {
    const file = e.currentTarget.files[0];
    console.log('Current value of file input : ',e.currentTarget.value);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileToAdd = {
        file: file,
        data: fileReader.result,
        isUploading: false,
        progress: 0,
      };
      console.log("File object assigned");
      //Add file to both inner and parent State
      setParentInput(fileToAdd);
    };
    fileReader.onabort = () => {
      alert("Reading Aborted");
    };
    fileReader.onerror = () => {
      console.log("Error occuren when Uploading file from disk");
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <Box display="flex" flexDirection="column" width="100%">
      {withProgress && (
        <Box display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <LinearProgress
              variant="determinate"
              color={btnColor || "primary"}
              {...props}
            />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">
              {`${Math.round(props.value)}%`}
            </Typography>
          </Box>
        </Box>
      )}
      <Box
        display="flex"
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
      >
        <label style={{ textAlign: "center", width: "100%" }}>
          <input
            {...props.inputProps}
            style={{ display: "none" }}
            id={id || name}
            name={name}
            type="file"
            ref={(input) => setInput(input)}
            value={inputValue || ""}
            onChange={(e) => handleUploadClick(e)}
            onClick={(e) => console.log(e.target.value)}
          />
          <Fab
            color={btnColor || "primary"}
            size={btnSize || "small"}
            // component="span"
            aria-label="add"
            variant="extended"
            onClick={(e) => input.click()}
          >
            {btnLabel}
          </Fab>
        </label>
      </Box>
    </Box>
  );
}

CustomUploaderButton.propTypes = {
  name: PropTypes.string.isRequired,
  inputValue: PropTypes.string,
  btnLabel: PropTypes.string.isRequired,
  //   clickhandler: PropTypes.func.isRequired,
  setParentInput: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default CustomUploaderButton;
