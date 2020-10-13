import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

function SidebarItem(props) {
  const { link, ItemIcon, label, type } = props.item;

  var isLinkActive =
    link &&
    (window.location.pathname === link || window.location.pathname.indexOf(link) !== -1);

  if (type === "divider") return <Divider />;
  return (
    <ListItem button to={link} selected={isLinkActive} component={Link}>
      <ListItemIcon>
        <ItemIcon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}

export default SidebarItem;
