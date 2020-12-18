import React, { useState, useEffect } from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Fab
} from "@material-ui/core";

//themes
import { defaultTheme } from "../../../../../themes/palettes";

// components
import Page from "../../../../shared/Page";
import LoadingComponent from "../../../../shared/LoadingComponent";
import CollapssibleTable from "../../../../shared/tables/CustomCollapsibleTable";
import { Add as AddIcon } from "@material-ui/icons";

import ManagerService from '../../../../../services/managerServices'
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: "white",
  },
  fab: {
      color: "white",
      backgroundColor: theme.palette.success.light
  }
}));
export default function Dashboard(props) {
  const classes = useStyles();

//   const dataRows = [{cycle: "Primaire",children: []},{cycle: "CEM",children: []},{cycle: "Lycé",children: []}];
  const dataColumns = [{key:"cycle", label: "Cycles"}];
  const subHeaders=[{key:"codeCl", label: "Classe"},{key:"description", label: "Intitulé"}];
//   const dataColumns = headCells.map((el) => el.label);

  // States
  const [DataRows, setDataRows] = useState([]);
  const [isLoading, setisLoading] = useState(false);

    // On Component Di mount, fetch required infos ( wilayas/communes, cycles,years,matieres)
    useEffect(() => {
        setisLoading(true);
        ManagerService.getAllClasses({adminType: 'manager'})
          .then((res) => {
                    const rows=[{cycle: "Primaire",children: []},{cycle: "CEM",children: []},{cycle: "Lycé",children: []}];
                    res.classes.forEach((classe) => {
                        rows[classe.cycle-1].children.push( {codeCl: classe.codeCl,description: classe.description});
                    });
                    setDataRows(rows)
                    setisLoading(false);
              },
              (err) => {
                setisLoading(false);
              }
          )
    
  }, []);

  return (
    <Page className={classes.root} title="Tableau de Bord">
      <MuiThemeProvider theme={defaultTheme}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LoadingComponent
                component={
                  <Paper className={classes.paper}>
                    <Box p={3}>
                        <Typography variant="h4" color="primary">Annuaire des cycles/années</Typography>
                    </Box>
                    <CollapssibleTable 
                    headLabels={dataColumns}
                    rows={DataRows}
                    subHeaderLabels={subHeaders}
                    subHeadersTitle={"Classes associées"}

                    
                    />
                    <Box m={3} p={3} display="flex" justifyContent="flex-end"><Fab className={classes.fab}>
                        <AddIcon/>

                    </Fab>
                    </Box>
                  </Paper>
                }
                controller={isLoading}
              />
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </Page>
  );
}
