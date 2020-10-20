import React from 'react'
import PropTypes from 'prop-types'
import { toast } from "react-toastify";

//styles
import {toastNotificationStyles as useStyles} from "./styles";

// components
import Notification from './Notification'

const positions = {
    TOP_LEFT:toast.POSITION.TOP_LEFT,
    TOP_CENTER:toast.POSITION.TOP_CENTER,
    TOP_RIGHT:toast.POSITION.TOP_RIGHT,
    BOTTOM_LEFT:toast.POSITION.BOTTOM_LEFT,
    BOTTOM_CENTER:toast.POSITION.BOTTOM_CENTER,
    BOTTOM_RIGHT:toast.POSITION.BOTTOM_RIGHT
}
  ;

function ToasterNotification(componentProps,options) {
    const position=positions[options.position]

    return (
        toast(
            <Notification
              {...componentProps}
            />,
            {...options, position:position },
          )
    )
}

ToasterNotification.propTypes = {
    componentProps: PropTypes.object,
    options: PropTypes.object

}

export default ToasterNotification

