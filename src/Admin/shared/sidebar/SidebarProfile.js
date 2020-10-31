import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// components
import ProfileAvatar from "../ProfileAvatar";

function SidebarProfile(props) {
  const { user } = props;
  return (
    <ProfileAvatar
      avatar={user.avatar}
      firstname={user.nom}
      lastname={user.prenom}
      descriptionTitle={user.description}
    />
  );
}

SidebarProfile.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,

        })
};

const mapStateToProps = (state) => ({
  user: state.managerReducer.user,
});



export default connect(mapStateToProps)(SidebarProfile);

