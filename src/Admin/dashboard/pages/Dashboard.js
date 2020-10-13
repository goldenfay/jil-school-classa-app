import React from "react";
import clsx from "clsx";
import { makeStyles,createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Deposits from "../components/Deposits";



// components
import Sidebar from '../components/sidebar/'
import CustomTable from '../../shared/CustomTable'
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nom', headerName: 'Nom', width: 130 },
  { field: 'prenom', headerName: 'Prénom', width: 130 },
  { field: 'classe', headerName: 'Classe', width: 130 },
  { field: 'matiere', headerName: 'Matière', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
    <Button
                size="small"
                className="px-2"
                variant="contained"
              >
                Delete
              </Button>
      ,
  },
];
const headCells = [
    { id: 'no', numeric: false, disablePadding: true, label: 'id' },
    { id: 'prenom', numeric: false, disablePadding: true, label: 'Nom' },
    { id: 'nom', numeric: false, disablePadding: false, label: 'Prénom' },
    { id: 'classe', numeric: false, disablePadding: false, label: 'Classe' },
    { id: 'matiere', numeric: false, disablePadding: false, label: 'Matière' },
    { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];
const rows = [
  { id: 1, prenom: 'Snow', nom: 'Jon',classe:'3AM',matiere:'Science naturelle', age: 35 },
  { id: 2, prenom: 'Lannister', nom: 'Cersei',classe:'3AM',matiere:'Science naturelle', age: 42 },
  { id: 3, prenom: 'Lannister', nom: 'Jaime',classe:'3AM',matiere:'Science naturelle', age: 45 },
  { id: 4, prenom: 'Stark', nom: 'Arya',classe:'3AM',matiere:'Science naturelle', age: 16 },
  { id: 5, prenom: 'Targaryen', nom: 'Daenerys',classe:'3AM',matiere:'Science naturelle', age: null },
  { id: 6, prenom: 'Melisandre', nom: null,classe:'3AM',matiere:'Science naturelle', age: 150 },
  { id: 7, prenom: 'Clifford', nom: 'Ferrara',classe:'3AM',matiere:'Science naturelle', age: 44 },
  { id: 8, prenom: 'Frances', nom: 'Rossini',classe:'3AM',matiere:'Science naturelle', age: 36 },
  { id: 9, prenom: 'Roxie', nom: 'Harvey',classe:'3AM',matiere:'Science naturelle', age: 65 },
];
const actions=[
  {
    color:'primary',
    label:'Signaler',
    clickHandler: (id)=> console.log(id)
  },
  {
    color:'secondary',
    label:'Decontracter',
    clickHandler: (id)=> console.log(id)
  },
];
const drawerWidth = 300;
const bootstraptheme = createMuiTheme({
  palette: {
    warning: {
      // Purple and green play nicely together.
      main: "#ff9800",
    },
    error: {
      main: '#f44336',
    },
    success: {
      main: '#4caf50',
    },
    default: {
      main: '#1976d2',
    },
    primary: {
      main: '#ff9800',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Sidebar open={open} classes={classes} handleDrawerClose={handleDrawerClose} />
      
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <h1>Chart</h1>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {/* <Orders /> */}
                <CustomTable 
                  tableTitle={"Liste des enseignants"} 
                  headCells={headCells} rows={rows} 
                  indexName={"id"} 
                  withActions={true} 
                  actionButtons={actions} 
                  customtheme={bootstraptheme}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
