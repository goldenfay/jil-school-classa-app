import React from "react";
import { List } from "@material-ui/core";

// components
import SidebarItem from "./SidebarItem";

export default function SidebarItemsList(
    {classes,
    items,
    location,
    isSidebarOpened
    }) {
  return (
    <div>
      <List className={classes.sidebarList}>
        {items.map((link) => (
          <SidebarItem
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </div>
  );
}
