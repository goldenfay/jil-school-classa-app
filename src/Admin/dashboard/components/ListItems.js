import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import AssignmentIcon from "@material-ui/icons/Assignment";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import GradientIcon from '@material-ui/icons/Gradient';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const mainListItems = (
  <div>
    <ListItem button to={"/"}>
      <ListItemIcon>
        <CastForEducationIcon />
      </ListItemIcon>
      <ListItemText primary="Enseignants" />
    </ListItem>
    <ListItem button to={"/"}>
      <ListItemIcon>
        <LoyaltyIcon />
      </ListItemIcon>
      <ListItemText primary="Abonnés" />
    </ListItem>
    <ListItem button to={"/"}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Eleves" />
    </ListItem>
    <ListItem button to={"/"}>
      <ListItemIcon>
        <GradientIcon />
      </ListItemIcon>
      <ListItemText primary="Pubs" />
    </ListItem>
    <ListItem button to={"/"}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Statistiques" />
    </ListItem>
    
    
  </div>
);

export const secondaryListItems = (
  <div>
    
    <ListItem button to={"/"}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button to={"/"}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Deconnexion" />
    </ListItem>
    
  </div>
);
