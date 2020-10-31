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
  { id: "classes", numeric: false, disablePadding: false, label: "Classe" },
  { id: "matiere", numeric: false, disablePadding: false, label: "Matière" },
  { id: "wilaya", numeric: false, disablePadding: false, label: "Wilaya" },
  { id: "commune", numeric: false, disablePadding: false, label: "Commune" },
  { id: "dateAjout", numeric: false, disablePadding: false, label: "Date d'ajout " },
];
const rows = [
  {
    id: 1,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Arbi",
    nom: "Benmardjen",
    classesIds: [],
    matieresIds: [],
    commune:'Cheraga',
    wilaya: "Alger",
    dateAjout: '16/10/2020'
  },
  {
    id: 2,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Mohamed",
    nom: "Mostefaoui",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '16/10/2020'
  },
  {
    id: 3,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Radja",
    nom: "Hlaimia",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '10/10/2020'
  },
  {
    id: 4,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Raouf",
    nom: "Ouroua",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '11/09/2020'
  },
  {
    id: 5,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Amina",
    nom: "Ouadah",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '06/10/2020'
  },
  {
    id: 6,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Rania",
    nom: "Ourad",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '11/10/2020'
  },
  {
    id: 7,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Clifford",
    nom: "Ferrara",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '16/10/2020'
  },
  {
    id: 8,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Frances",
    nom: "Rossini",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '14/09/2020'
  },
  {
    id: 9,
    username:'',
    email: '',
    phone: '',
    password:'',
    adminType: 'teacher',
    prenom: "Roxie",
    nom: "Harvey",
    classesIds: [],
    matieresIds: [],
    commune:'Birkhadem',
    wilaya: "Alger",
    dateAjout: '10/08/2020'
  },
];



export  { columns, headCells, rows };
