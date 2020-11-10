import React, { useState,useEffect } from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  Container,
  Button,
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import {TimelineContent,TimelineOppositeContent}  from '@material-ui/lab';
import TimelineDot from '@material-ui/lab/TimelineDot';


import {red,indigo,deepPurple} from "@material-ui/core/colors"
import { Search as SearchIcon } from "react-feather";
import AddIcon from "@material-ui/icons/Add";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import RemoveIcon from "@material-ui/icons/Remove";
//themes
import { defaultTheme, bootstraptheme } from "../../../../../themes/palettes";

// components
import CustomTable from "../../../../shared/tables/CustomTable";
import AddEnseignantsForm from "./Add";
import Page from "../../../../shared/Page";
import LoadingComponent from '../../../../shared/LoadingComponent' 
import Modal from '../../../../shared/Modal' 
import InforCard from './InfoCard' 

// Data
import { headCells } from "../../../../../fake/fakeProfs";
// import {ManagerActions} from "../../../../../redux/actions/";
import TeacherService from "../../../../../services/teacherServices";

const actions = [
  {
    color: "primary",
    label: "Signaler",
    clickHandler: (id) => console.log(id),
    startIcon: ErrorOutlineIcon,
  },
  {
    color: "secondary",
    label: "Résilier",
    clickHandler: (id) => console.log(id),
    startIcon: RemoveIcon,
  },
];

const successtheme = createMuiTheme({
  palette: {
    primary: { main: "#4caf50" },
    secondary: {
      main: "#f44336",
    },
  },
});
const cyclesTheme = createMuiTheme({
  palette: {
    primary: red,
    secondary: deepPurple,
    error: indigo,
  },
});
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
}));



export default function Enseignants(props) {
  const classes = useStyles();
  // States
  const [profsRows, setProfsRows] = useState([]); //the original rows
  const [filtredProfsRows, setFiltredProfsRows] = useState([]); // The filtered rows after searching changes
  const [isLoading, setisLoading] = useState(false); // Loading spinners controller
  const [showAddForm, setShowAddForm] = useState(false); // Loading spinners controller
  const [popupOpen, setPopupOpen] = useState(false); // info card modal controller

    // On component did mount, fetch teachers infos
  useEffect(()=>{
    setisLoading(true);

    TeacherService.getAll({adminType:"manager"}).then(
      res=>{
        setisLoading(false);
        console.log('Suceess Fetch profs',res);
        const rows=res.enseignants.map((ens)=>({
          ...ens,
          matiere: ens.matiere.titre,
          classes: ens.classes.map(cl=>({
      
            // avatar: <Avatar alt={eleve.username}  src={eleve.avatar} />,
            label:cl.codeCl,
            // variant:"outlined" ,
            clickable : true
          }))
        }))
        setFiltredProfsRows(rows);
        setProfsRows(rows);

      },
      err=>{
        setisLoading(false);
        console.log('Error ',err)
      }
    )
    

  },[])

  const [popupBody,setpopupBody]=useState((<></>));

  // SearcheBar handle changes
  const handleSearchInputChange = (e) => {

    if (e.target.value.length < 4) {
      setFiltredProfsRows(profsRows);
      return;
    }
    const value = e.target.value;
    setFiltredProfsRows(
      profsRows.filter(
        (row) =>
          (row.nom && row.nom.indexOf(value) !== -1) ||
          (row.prenom && row.prenom.indexOf(value) !== -1)
      )
    );
  };

  const rowClickHandler=(profId)=>{
    const prof=profsRows.find(ens=>ens.id===profId);
    if(!prof) {
      console.error("Le prof clciké n'a pas été trouvé");
      return;
    }
    const {nom,prenom,image}=prof;
    setPopupOpen(true);
    setpopupBody(
      (
        <Container >
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <InforCard 
        nom={nom}
        prenom={prenom}
        image={image}
        jobTitle={`Enseignant en ${prof.matiere}`}

        />

      </Grid>
      <Grid item xs={12} sm={7}>

    <Paper elevation={3} style={{padding: "1rem"}}>
      <Typography color="textPrimary" variant="h6">
        Derniers cours ajoutés
      </Typography>
      <Timeline align="alternate">
      {prof.cours.map((cours,index)=> 
      <TimelineItem>
        <TimelineOppositeContent>
            <Typography color="textSecondary">09:30 am</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={index%2===0?"primary":"secondary"} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>{cours.titre}</Typography>
          </TimelineContent>
      </TimelineItem>)}
      
    </Timeline>
    </Paper>

      </Grid>

    </Grid>

  </Container>
      )
    )

  }

  return (
    <Page className={classes.root} title="Enseignants">
      <MuiThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" className={classes.container}>
          <Modal 
          open={popupOpen}
          title={"Carte Informative"}
          body={popupBody}
          handleClose={()=>setPopupOpen(false)}
           />
          <Grid container spacing={3}>
            {/* Liste des enseignants */}
            <Grid container justify="flex-end"></Grid>
            {/* Recherche d'abonnes */}
            <Grid item xs={12} sm={8}>
              <Box mt={3}>
                
                    <Box maxWidth={500}>
                      <TextField
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon fontSize="small" color="action">
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Rechercher un enseignants ..."
                        variant="outlined"
                        onChange={(e) => handleSearchInputChange(e)}
                      />
                    </Box>
                 
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box mt={3} alignItems="center" justifyContent="center" display="flex" flexDirection="row">
                <MuiThemeProvider theme={successtheme}>
                  <Button
                    size="medium"
                    variant="contained"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={(e)=>setShowAddForm(true)}
                  >
                    Ajouter
                  </Button>
                </MuiThemeProvider>
              </Box>
            </Grid>
            {/* Liste des enseignants */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <MuiThemeProvider theme={bootstraptheme}>
                  <LoadingComponent component={<CustomTable
                    tableTitle={"Liste des enseignants"}
                    headCells={headCells}
                    rows={filtredProfsRows}
                    rowClickHandler={rowClickHandler}
                    indexName={"id"}
                    withActions={true}
                    actionButtons={actions}
                    innerTheme={cyclesTheme}
                  />}
                  controller={isLoading}

                  />
                </MuiThemeProvider>
              </Paper>
            </Grid>
            {showAddForm && (<Grid item xs={12}>
              <Paper className={classes.paper}>
                <MuiThemeProvider theme={defaultTheme}>
                  <AddEnseignantsForm />
                </MuiThemeProvider>
              </Paper>
            </Grid>)}
          </Grid>
        </Container>
      </MuiThemeProvider>
    </Page>
  );
}
