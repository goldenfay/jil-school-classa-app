import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { ManagerActions as Actions } from "../../../redux/actions";

const useStyles = makeStyles((theme) => ({
  listItem: {
    "&$selected": {
      backgroundColor: `${theme.palette.primary.light}`,
      color: "white",
    },
  },
  selected: {
    backgroundColor: `${theme.palette.primary.light}`,
    color: "white",
  },
}));
function SidebarItem(props) {
  const classes = useStyles();
  const { link, ItemIcon, label, type } = props.item;
  // const mylabel=props.label
  const isLinkActive =
    link &&
    (window.location.pathname === link ||
      window.location.pathname.indexOf(link) !== -1);
  // const [isLinkActive,setLinkActive] =useState(false);
  const [mylink, setMylink] = useState(link);

  if (isLinkActive) props.updateSelectedLink({ selectedLink: mylink });

  const handleClick = () => {
    // props.handleClick();
    // setLinkActive(true);
    props.updateSelectedLink({ selectedLink: mylink });
  };
  if (type === "divider") return <Divider />;
  return (
    <ListItem
      button
      to={link}
      selected={props.selectedLink === mylink}
      className={classes.listItem}
      component={Link}
      onClick={() => handleClick()}
    >
      <ListItemIcon>
        <ItemIcon />
      </ListItemIcon>

      <ListItemText primary={label} />
    </ListItem>
  );
}

const mapStateToProps = (state) => ({
  // selectedLink: state.managerLayoutReducer.selectedLink,
  selectedLink: state.managerLayoutReducer.selectedLink,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedLink: (params) =>
      dispatch(Actions.updateSelectedLink(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);
