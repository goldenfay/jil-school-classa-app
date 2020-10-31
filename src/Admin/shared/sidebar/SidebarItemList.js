import React, {useState} from "react";
import List from "@material-ui/core/List";


//components
import SidebarItem from './SidebarItem'
// import {useLayoutState,useLayoutDispatch,changeLink } from "../../../statecontexts/LayoutContext";


function SidebarItemList(props) {
    const [mylabel,setLabel]=useState('hello');
    const {navItems}=props;
    
    return (
        <List>
            {navItems.map((item,key)=>
                <SidebarItem key={key} item={item} handleClick={()=>setLabel(item.link) }  label={mylabel} />

            )}
            
        </List>
    )
}



export default SidebarItemList

