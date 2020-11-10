import React from 'react'
import PropTypes from 'prop-types'
import {Paper,Card,CardContent,Divider} from '@material-ui/core';

// Components
import ProfileAvatar from "../../../../shared/ProfileAvatar";

function InfoCard(props) {
    return (
<Paper elevation={3}>
<Card
            >
              <CardContent>
                <ProfileAvatar
                  firstname={props.nom}
                  lastname={props.prenom}
                  avatar={props.image}
                  descriptionTitle={props.jobTitle}
                  classes={props.classes}
                />
              </CardContent>
              <Divider />
              {props.additionalContent}
              
            </Card>
    

</Paper>
    )
}

InfoCard.propTypes = {
    nom: PropTypes.string.isRequired,
    prenom: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,

}

export default InfoCard

