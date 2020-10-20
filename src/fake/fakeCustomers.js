
const customersHeadCells = [
    { id: "id", numeric: false, disablePadding: true, label: "id" },
    { id: "nom", numeric: false, disablePadding: true, label: "Nom" },
    { id: "prenom", numeric: false, disablePadding: false, label: "Prénom" },
    { id: "eleves", numeric: false, disablePadding: true, label: "Eleves",withChip: true,usesInnerTheme: true },
    { id: "wilaya", numeric: false, disablePadding: false, label: "Wilaya" },
    { id: "commune", numeric: false, disablePadding: false, label: "Commune" },
    { id: "phone", numeric: false, disablePadding: false, label: "Télephone" },
    { id: "status", numeric: false, disablePadding: false, label: "Etat", withChip: true },
  ];
  
  const customersRows = [
    {
      id: 1,
      prenom: "Ahmed",
      nom: "Allilat",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Kouba',
      wilaya: "Alger",
      eleves:[{id:'436345',username:"Yacino",avatar:'assets/Dummy/Avatars/avatar_4.png'},{id:'436345',username:"Madjid",avatar:'assets/Dummy/Avatars/avatar_7.png'},{id:'436345',username:"Ahmed",avatar:'assets/Dummy/Avatars/avatar_6.png'}]
    },
    {
      id: 2,
      prenom: "Yacine",
      nom: "Mokhtari",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Canastel',
      wilaya: "Oran",
      eleves:[{id:'436345',username:"Moh",avatar:'assets/Dummy/Avatars/avatar_3.png'}]
    },
    {
      id: 3,
      prenom: "Boualam",
      nom: "Haimoud",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Reghaia',
      wilaya: "Alger",
      eleves:[{id:'436345',username:"Amin34",avatar:'jfdhsdkjfhdjkshassets/Dummy/Avatars/avatar_4.png'},{id:'436345',username:"Mohamed",avatar:'assets/Dummy/Avatars/avatar_4.png'},{id:'436345',username:"Yasser",avatar:'assets/Dummy/Avatars/avatar_8.png'}]
    },
    {
      id: 4,
      prenom: "Mahdi",
      nom: "Messarat",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Ain safra',
      wilaya: "Adrar",
      eleves:[{id:'436345',username:"Romaissa",avatar:'assets/Dummy/Avatars/avatar_8.png'}]
    },
    {
      id: 5,
      prenom: "Houria",
      nom: "Ouali",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Kouba',
      wilaya: "Alger",
      eleves:[{id:'436345',username:"Maissa",avatar:''},{id:'436345',username:"Imene",avatar:'assets/Dummy/Avatars/avatar_7.png'},{id:'436345',username:"Ahmed",avatar:'assets/Dummy/Avatars/avatar_6.png'}]
    },
    {
      id: 6,
      prenom: "Anis",
      nom: "Redioui",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Birkhadem',
      wilaya: "Alger",
      eleves:[{id:'436345',username:"Ryad",avatar:'assets/Dummy/Avatars/avatar_3.png'},{id:'436345',username:"Madjid",avatar:'assets/Dummy/Avatars/avatar_5.png'},{id:'436345',username:"Ahmed",avatar:'assets/Dummy/Avatars/avatar_4.png'}]
    },
    {
      id: 7,
      prenom: "Ahlam",
      nom: "Ferroukhi",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Ouled fayet',
      wilaya: "Alger",
      eleves:[{id:'436345',username:"Yassmine08",avatar:'gfdgfdassets/Dummy/Avatars/avatar_4.png'}]
    },
    {
      id: 8,
      prenom: "Zined",
      nom: "Amrouche",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Kouba',
      wilaya: "Alger",
      eleves:[{id:'436345',username:"Nassim",avatar:'assets/Dummy/Avatars/avatar_6.png'}]
    },
    {
      id: 9,
      prenom: "Zineddine",
      nom: "Ferhat",
      status:{label:"Actif",color:"primary"},
      phone: "3AM",
      commune:'Hydra',
      wilaya: "Alger",
      eleves:[{id:'436345',username:"Kamilia",avatar:'assets/Dummy/Avatars/avatar_8.png'},{id:'436345',username:"Madjid",avatar:'assets/Dummy/Avatars/avatar_4.png'},{id:'436345',username:"Ahmed",avatar:'assets/Dummy/Avatars/avatar_3.png'}]
    },
  ];
  export {customersHeadCells,customersRows}