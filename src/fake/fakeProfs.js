const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nom", headerName: "Nom", width: 130 },
  { field: "prenom", headerName: "Prénom", width: 130 },
  { field: "classe", headerName: "Classe", width: 130 },
  { field: "matiere", headerName: "Matière", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  
];
const headCells = [
  { id: "id", numeric: false, disablePadding: true, label: "id" },
  { id: "nom", numeric: false, disablePadding: true, label: "Nom" ,withAvatar:true},
  { id: "prenom", numeric: false, disablePadding: false, label: "Prénom" },
  { id: "classe", numeric: false, disablePadding: false, label: "Classe" },
  { id: "matiere", numeric: false, disablePadding: false, label: "Matière" },
  { id: "wilaya", numeric: false, disablePadding: false, label: "Wilaya" },
  { id: "commune", numeric: false, disablePadding: false, label: "Commune" },
  { id: "dateAjout", numeric: false, disablePadding: false, label: "Date d'ajout " },
];
const rows = [
  {
    id: 1,
    prenom: "Arbi",
    nom: "Benmardjen",
    classe: "3AM",
    matiere: "Science naturelle",
    commune:'Cheraga',
    wilaya: "Alger",
    dateAjout: '16/10/2020'
  },
  {
    id: 2,
    prenom: "Mohamed",
    nom: "Mostefaoui",
    classe: "3TM",
    matiere: "Math",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '16/10/2020'
  },
  {
    id: 3,
    prenom: "Radja",
    nom: "Hlaimia",
    classe: "2AS",
    matiere: "Génie electrique",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '10/10/2020'
  },
  {
    id: 4,
    prenom: "Raouf",
    nom: "Ouroua",
    classe: "4AP",
    matiere: "Arabe",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '11/09/2020'
  },
  {
    id: 5,
    prenom: "Amina",
    nom: "Ouadah",
    classe: "5AP",
    matiere: "Science naturelle",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '06/10/2020'
  },
  {
    id: 6,
    prenom: "Rania",
    nom: "Ourad",
    classe: "4AM",
    matiere: "Physique",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '11/10/2020'
  },
  {
    id: 7,
    prenom: "Clifford",
    nom: "Ferrara",
    classe: "3AM",
    matiere: "Physique",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '16/10/2020'
  },
  {
    id: 8,
    prenom: "Frances",
    nom: "Rossini",
    classe: "1AS",
    matiere: "Math",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '14/09/2020'
  },
  {
    id: 9,
    prenom: "Roxie",
    nom: "Harvey",
    classe: "2AM",
    matiere: "Science naturelle",
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '10/08/2020'
  },
];



export  { columns, headCells, rows };
