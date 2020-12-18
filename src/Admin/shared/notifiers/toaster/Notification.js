import React from "react";
import { Button ,Typography} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import classnames from "classnames";
import tinycolor from "tinycolor2";

import {Info} from "@material-ui/icons"
// styles
import {notificationStyles as useStyles, toastNotificationStyles as useToasterStyles} from "./styles";



export default function Notification({ variant, ...props }) {
    const theme = useTheme();
  const classes = useStyles();
  const toasterStyles=useToasterStyles();

  const icon = props.icon || <Info/>
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: classes.notificationIcon,
    },
    style: {
      color:
        variant !== "contained" &&
        theme.palette[props.color] &&
        theme.palette[props.color].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, toasterStyles.notificationComponent, {
        [classes.notificationContained]: variant === "contained",
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === "contained" &&
          theme.palette[props.color] &&
          theme.palette[props.color].main,
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === "contained",
          [classes.notificationIconContainerRounded]: variant === "rounded",
        })}
        style={{
          backgroundColor:
            variant === "rounded" &&
            theme.palette[props.color] &&
            tinycolor(theme.palette[props.color].main)
              .setAlpha(0.15)
              .toRgbString(),
        }}
      >
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === "contained",
          })}
          variant={props.typographyVariant}
        //   size={variant !== "contained" && !props.typographyVariant ? "md":"sm"}
        >
          {props.message}
        </Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}
          >
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}


