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
  const ordersHeadCells = [
    { id: "codeAchat", numeric: false, disablePadding: true, label: "Code d'achat" },
    { id: "date", numeric: false, disablePadding: false, label: "Date" },
    { id: "type", numeric: false, disablePadding: true, label: "Type" },
    { id: "classes", numeric: false, disablePadding: true, label: "Classes Inscrites",withChip: true,usesInnerTheme: true },
    { id: "client", numeric: false, disablePadding: false, label: "Client" },
    { id: "status", numeric: false, disablePadding: false, label: "Etat", withChip: true },
  ];
  const profsHeadCells = [
    // { id: "id", numeric: false, disablePadding: true, label: "id" },
    { id: "nom", numeric: false, disablePadding: true, label: "Nom" ,withAvatar:true},
    { id: "prenom", numeric: false, disablePadding: false, label: "Prénom" },
    { id: "classes", numeric: false, disablePadding: false, label: "Classes",withChip: true,usesInnerTheme: true },
    { id: "matiere", numeric: false, disablePadding: false, label: "Matière" },
    { id: "wilaya", numeric: false, disablePadding: false, label: "Wilaya" },
    { id: "commune", numeric: false, disablePadding: false, label: "Commune" },
    { id: "date_ajout", numeric: false, disablePadding: false, label: "Date d'ajout " },
  ];
  const pubsHeadCells = [
    { id: "titre", numeric: false, disablePadding: true, label: "Titre" },
    { id: "sponsor", numeric: false, disablePadding: false, label: "Publicateur" },
    { id: "thumbnail", numeric: false, disablePadding: false, label: "Aperçu",withChildComponent:true },
    { id: "actions", numeric: false, disablePadding: false, label: "Actions",withChildComponent:true },
    
  ];
  const coursHeadCells = [
    { id: "id", numeric: false, disablePadding: true, label: "id" },
    { id: "titre", numeric: false, disablePadding: true, label: "Titre" },
    { id: "video", numeric: false, disablePadding: false, label: "URL Vidéo" },
    { id: "thumbnail", numeric: false, disablePadding: false, label: "Arérçu" },
    { id: "date_ajout", numeric: false, disablePadding: false, label: "Date d'ajout" },
   
  ];

  export {customersHeadCells,ordersHeadCells,profsHeadCells,pubsHeadCells,coursHeadCells}