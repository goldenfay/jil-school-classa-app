import React, {useState} from "react";
import List from "@material-ui/core/List";

import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import GradientIcon from '@material-ui/icons/Gradient';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//components
import SidebarItem from './SidebarItem'
// import {useLayoutState,useLayoutDispatch,changeLink } from "../../../statecontexts/LayoutContext";


const navItems=[
    {
        link:'/enseignants',
        ItemIcon:CastForEducationIcon,
        label:'Enseignants'
    },
    {
        link:'/abonnes',
        ItemIcon:LoyaltyIcon,
        label:'Abonnés'
    },
    {
        link:'/eleves',
        ItemIcon:PeopleIcon,
        label:'Eleves'
    },
    {
        link:'/pubs',
        ItemIcon:GradientIcon,
        label:'Pubs'
    },
    {
        link:'/dashboard',
        ItemIcon:BarChartIcon,
        label:'Statistiques'
    },
    {
        type:'divider'
     
    },
    {
        link:'/profile',
        ItemIcon:PersonIcon,
        label:'Profile'
    },
    {
        link:'/logout',
        ItemIcon:ExitToAppIcon,
        label:'Deconnexion'
    },

]

function SidebarItemList(props) {
    const [mylabel,setLabel]=useState('hello');
     // global
//   var { selectedLink } = useLayoutState();
//   var layoutDispatch = useLayoutDispatch();
    
    return (
        <List>
            {navItems.map((item,key)=>
                // <SidebarItem key={key} item={item} handleClick={()=>changeLink(layoutDispatch,item.link)} />
                <SidebarItem key={key} item={item} handleClick={()=>setLabel(item.link) }  label={mylabel} />

            )}
            
        </List>
    )
}



export default SidebarItemList

