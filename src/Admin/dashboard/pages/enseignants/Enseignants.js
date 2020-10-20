import React, { useState } from "react";
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
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import AddIcon from "@material-ui/icons/Add";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import RemoveIcon from "@material-ui/icons/Remove";
//themes
import { defaultTheme, bootstraptheme } from "../../../../themes/palettes";

// components
import CustomTable from "../../../shared/tables/CustomTable";
import AddEnseignantsForm from "./Add";
import Page from "../../components/Page";

// Data
import { headCells, rows as fakeProfsRows } from "../../../../fake/fakeProfs";

const actions = [
  {
    color: "primary",
    label: "Signaler",
    clickHandler: (id) => console.log(id),
    startIcon: ErrorOutlineIcon,
  },
  {
    color: "secondary",
    label: "Decontracter",
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
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
}));
export default function Enseignants(props) {
  // const customclasses = useStyles();

  // const { classes } = props;
  // States
  const profsRows=fakeProfsRows;
  const [filtredProfsRows, setFiltredProfsRows] = useState(profsRows);

  const classes = useStyles();
  // SearcheBar handle changes
  const handleSearchInputChange = (e) => {
    console.log(e.target.value);

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

  return (
    <Page className={classes.root} title="Enseignants">
      <MuiThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" className={classes.container}>
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
                    tableTitle={"Liste des enseignants"}
                    headCells={headCells}
                    rows={filtredProfsRows}
                    indexName={"id"}
                    withActions={true}
                    actionButtons={actions}
                    // customtheme={bootstraptheme}
                  />
                </MuiThemeProvider>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <MuiThemeProvider theme={defaultTheme}>
                  <AddEnseignantsForm />
                </MuiThemeProvider>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </Page>
  );
}
