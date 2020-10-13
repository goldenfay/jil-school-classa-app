import React from "react";
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
        link:'/ads',
        ItemIcon:GradientIcon,
        label:'Pubs'
    },
    {
        link:'/admindashboard',
        ItemIcon:BarChartIcon,
        label:'Statistiques'
    },
    {
        type:'divider'
     
    },
    {
        link:'/adminprofile',
        ItemIcon:PersonIcon,
        label:'Profile'
    },
    {
        link:'/logout',
        ItemIcon:ExitToAppIcon,
        label:'Deconnexion'
    },

]

function SidebarItemList(propos) {
    
    return (
        <List>
            {navItems.map((item,key)=>
                <SidebarItem key={key} item={item}/>

            )}
            
        </List>
    )
}



export default SidebarItemList

