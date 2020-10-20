
const ordersHeadCells = [
    { id: "codeAchat", numeric: false, disablePadding: true, label: "Code d'achat" },
    { id: "date", numeric: false, disablePadding: false, label: "Date" },
    { id: "type", numeric: false, disablePadding: true, label: "Type" },
    { id: "classes", numeric: false, disablePadding: true, label: "Classes Inscrites",withChip: true,usesInnerTheme: true },
    { id: "client", numeric: false, disablePadding: false, label: "Client" },
    { id: "status", numeric: false, disablePadding: false, label: "Etat", withChip: true },
  ];
  
  const ordersRows = [
    {
      codeAchat: "1fGRTEHETR45658",
      type: "U",
      classes: [{label:"4AM",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label: "Actif",color:"primary"},
      date: "11/10/2020",
      client: "Zineb Amrouche",
    
    },
    {
      codeAchat: "2fGRTEHETR45658",
      type: "T",
      classes: [{label:"2AM",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label: "Actif",color:"primary"},
      date: "13/10/2020",
      client: "Yassine Lallou",
    
    },
    {
      codeAchat: "6fGRTEHETR45658",
      type: "U",
      classes: [{label:"3TM",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label: "Actif",color:"primary"},
      date: "15/10/2020",
      client: "Zineddine Ferhat",
    
    },
    {
      codeAchat: "5fGRTEHETR45658",
      type: "T",
      classes: [{label:"4AM",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label:"Inctif",color:"secondary"},
      date: "13/10/2020",
      client: "Yassine Djebarri",
     
    },
    {
      codeAchat: "4fGRTEHETR45658",
      type: "U",
      classes: [{label:"2AS",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label:"Inctif",color:"secondary"},
      date: "10/10/2020",
      client: "Mahdi Hamiche",
    
    },
    {
      codeAchat: "7fGRTEHETR45658",
      type: "U",
      classes: [{label:"4AM",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label: "Actif",color:"primary"},
      date: "15/10/2020",
      client: "Issam Lahlou",
    
    },
    {
      codeAchat: "9fGRTEHETR45658",
      type: "T",
      classes: [{label:"2AS",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label: "Actif",color:"primary"},
      date: "19/10/2020",
      client: "Maissa Harnan",
   
    },
    {
      codeAchat: "3fGRTEHETR45658",
      type: "T",
      classes: [{label:"5AP",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label: "Actif",color:"primary"},
      date: "13/10/2020",
      client: "Amine Hoacine",
  
    },
    {
      codeAchat: "8fGRTEHETR45658",
      type: "T",
      classes: [{label:"3AM",color: "primary",variant: "outlined"},{label:"3AP",color:"secondary",variant: "outlined"},{label:"2L2",color:"default",variant: "outlined"}],
      status:{label: "Actif",color:"primary"},
      date: "13/10/2020",
      client: "Yassmine Lalou",
    
    },
  ];
  export {ordersHeadCells,ordersRows}