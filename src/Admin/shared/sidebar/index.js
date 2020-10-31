
import React from 'react'
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";


//components
import SidebarItemsList from './SidebarItemList'
import SidebarProfile from './SidebarProfile'
import { Divider } from '@material-ui/core';

const user={
  avatar:'logo192.png',
  firstname: 'Yassice',
  lastname: 'Djebarri'
}

export default function index(props) {
    const {classes,open,handleDrawerClose}=props;
   
    return (
        <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {open && <SidebarProfile  />}
        <div className={classes.toolbarIcon}>
         
        </div>
        <Divider/>
        <SidebarItemsList navItems={props.navItems}  />
       
      </Drawer>
    )
}
