import React, { useState } from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Paper,
} from "@material-ui/core";
import { Search as SearchIcon } from "react-feather";
import MUIDataTable from "mui-datatables";

//themes
import { defaultTheme } from "../../../../themes/palettes";

// components
import CustomTable from "../../../shared/tables/CustomTable";
import Page from "../../../shared/Page";

// Data
import { headCells, rows as fakeProfsRows } from "../../../../fake/fakeProfs";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
}));
export default function Eleves(props) {
  const profsRows=fakeProfsRows;
  const dataColumns=headCells.map((el)=>el.label)
  const dataRows=profsRows.map((row)=>(  headCells.map((column)=> row[column.id] ) ))
 
  // States
  const [filtredElevesRows, setFiltredElevesRows] = useState(profsRows);

  const classes = useStyles();
  // SearcheBar handle changes
  const handleSearchInputChange = (e) => {
    console.log(e.target.value);

    if (e.target.value.length < 4) {
      setFiltredElevesRows(profsRows);
      return;
    }
    const value = e.target.value;
    setFiltredElevesRows(
      profsRows.filter(
        (row) =>
          (row.nom && row.nom.indexOf(value) !== -1) ||
          (row.prenom && row.prenom.indexOf(value) !== -1)
      )
    );
  };

  return (
    <Page className={classes.root} title="Eleves">
      <MuiThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
           
            {/* Recherche d'eleves */}
            {/* <Grid item xs={12} sm={8}>
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
                        placeholder="Rechercher un élève ..."
                        variant="outlined"
                        onChange={(e) => handleSearchInputChange(e)}
                      />
                    </Box>
                 
              </Box>
            </Grid> */}
            
            {/* Liste des eleves */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <CustomTable
                    tableTitle={"Liste des élèves"}
                    headCells={headCells}
                    rows={filtredElevesRows}
                    indexName={"id"}
                    withActions={false}
                  />
              </Paper>
            </Grid> */}
            {/* Liste des eleves */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <MUIDataTable
            title="Liste des élèves inscrits"
            data={dataRows}
            columns={dataColumns}
            options={{
              filterType: "checkbox",
            }}
          />
                  
              </Paper>
            </Grid>
            
          </Grid>
        </Container>
      </MuiThemeProvider>
    </Page>
  );
}
