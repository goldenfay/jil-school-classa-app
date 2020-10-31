import React, { useEffect, useState } from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  Container,
  Button,
  IconButton,
  Box,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Paper,
} from "@material-ui/core";
import {purple} from "@material-ui/core/colors"
import { Search as SearchIcon } from "react-feather";
import AddIcon from "@material-ui/icons/Add";
import { Cancel as CancelIcon, 
  Error as ErrorIcon,
  PictureAsPdf as PDFIcon,
  LiveHelp as QuizIcon
 } 
  from "@material-ui/icons";

// Redux 
import { connect } from 'react-redux'


//themes
import { defaultTheme, bootstraptheme } from "../../../../../themes/palettes";

// components
import CustomTable from "../../../../shared/tables/CustomTable";
import AddCoursForm from "./Add/AjouterCours";
import Page from "../../../../shared/Page";

// Services
import TeacherService from '../../../../../services/teacherServices'

// Data
import {
  headCells,
} from "../../../../../fake/fakeCours";

const successtheme = createMuiTheme({
  palette: {
    primary: { main: "#4caf50" },
    secondary: {
      main: "#f44336",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
  grid: {
    padding: theme.spacing(2),
  },
  red: {
    color: theme.palette.error.light,
    cursor: "pointer"
  },
  purple: {
    color: purple[300],
    cursor: "pointer"
  },
}));




export function Contenu(props) {
    // Styles
  const classes = useStyles();


  // States
  
  const [coursRows, setCoursRows] = useState([]);
  const [filtredCoursRows, setFiltredCoursRows] = useState([]);
  
  
  useEffect(()=>{
    headCells.push({
      id: "attachements",
      numeric: false,
      disablePadding: false,
      label: "Attachements",
      withChildComponent: true,
    });
    headCells.push({
      id: "actions",
      numeric: false,
      disablePadding: false,
      label: "Actions",
      withChildComponent: true,
    });
    TeacherService.getProfCourses({
      adminType: "teacher",
      id: props.teacher.id
    }).then(
      res=>{
        console.log("Les cours de ce prof : ",res)
        const rows=res.map((row) => ({
          ...row,
          actions: (
            <>
              <Tooltip title="Modifier">
              <IconButton
                size="medium"
                color="primary"
                onClick={(e) => console.log(row)}
              >
                <ErrorIcon />
              </IconButton>
              </Tooltip>
              <Tooltip title="Supprimer">
              <IconButton
                size="medium"
                color="secondary"
                onClick={(e) => console.log("clicked")}
              >
                <CancelIcon />
              </IconButton>
              </Tooltip>
            </>
          ),
          attachements:(
            <>
            
                 
                 <Tooltip title={`Ce cours contient un ${"résumé"} en PDF`} ><IconButton disabled={!row.pdfFile || row.pdfFile===null}> <PDFIcon fontSize="large" className={classes.red} /> </IconButton></Tooltip>
                 <Tooltip title={`Ce cours contient un quiz de ${row.questionsList.length} questions`} ><IconButton> <QuizIcon fontSize="large" className={classes.purple} /> </IconButton></Tooltip>
              

            </>
          
          )
        }));
        setCoursRows(rows);
        setFiltredCoursRows(rows)
      },
      err=>{

      }
    )


  },[])




  // SearcheBar handle changes
  const handleSearchInputChange = (e) => {
    console.log(e.target.value);

    if (e.target.value.length < 4) {
      setFiltredCoursRows(coursRows);
      return;
    }
    const value = e.target.value;
    setFiltredCoursRows(
      coursRows.filter(
        (row) =>
          (row.titre && row.titre.indexOf(value) !== -1) ||
          (row.titrePdf && row.titrePdf.indexOf(value) !== -1)
      )
    );
  };

  return (
    <Page className={classes.root} title="Contenu Pédagogique">
      <MuiThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recherche de cours */}
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
                    placeholder="Rechercher un cours ..."
                    variant="outlined"
                    onChange={(e) => handleSearchInputChange(e)}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                mt={3}
                alignItems="center"
                justifyContent="center"
                display="flex"
                flexDirection="row"
              >
                <MuiThemeProvider theme={successtheme}>
                  <Button
                    size="medium"
                    variant="contained"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    color="primary"
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
                  <CustomTable
                    withStartCheckbox={false}
                    tableTitle={"Liste des cours"}
                    headCells={headCells}
                    rows={filtredCoursRows}
                    indexName={"id"}
                    withActions={false}
                    // actionButtons={actions}
                    // customtheme={bootstraptheme}
                  />
                </MuiThemeProvider>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                className={classes.paper}
                style={{ padding: defaultTheme.spacing(2) }}
              >
                <Typography variant="h4" color="textPrimary" align="center">
                  Ajouter Un Nouveau Cours
                </Typography>
                <MuiThemeProvider theme={defaultTheme}>
                  <AddCoursForm teacher={props.teacher}/>
                </MuiThemeProvider>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </Page>
  );
}
const mapStateToProps = (state) => ({
  teacher : state.managerReducer.user
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Contenu)

