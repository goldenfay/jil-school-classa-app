import React, { useEffect, useState } from "react";
import { Grid, Container, Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


// Components
import Page from "../../../shared/Page";
import ElevesStatCharts from "../components/charts/ElevesStatCharts";
import ProfsGeoPartitionPie from "../components/charts/ProfsGeoPartition";
import ClassesByProfDist from "../components/charts/ClassesByProfDist";
import Summary from "../components/charts/Summary";

// Services
import ManagerService from "../../../../services/managerServices";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  
}));

function Statistiques(props) {
  const classes = useStyles();

  useEffect(() => {
      // Fetch profs related statistics
    ManagerService.getProfsStatistics({ adminType: "manager" }).then(
      (res) => {
        console.log("Profs statistics : ",res);
        setProfsSummary(res);
        setProfsSummaryisLoading(false);
      },
      (err) => {}
    );
      // Fetch eleves related statistics
    ManagerService.getElevesStatistics({ adminType: "manager" }).then(
      (res) => {
        console.log("Eleves Statistics : ",res);
        setElevesSummary(res);
        setElevesSummaryisLoading(false);
      },
      (err) => {}
    );
  }, []);

  // Loading flags states
  const [profsSummaryisLoading, setProfsSummaryisLoading] = useState(true);
  const [elevesSummaryisLoading, setElevesSummaryisLoading] = useState(true);
  // Data states
  const [profsSummary, setProfsSummary] = useState({ profsByWilaya: [],
    classesByprof: [] });
  const [elevesSummary, setElevesSummary] = useState({ 
    elevesByAge: [] ,
    elevesBySexe: [] ,
  });
  return (
    <Page className={classes.root} title="Statistiques">
    <Container>
      {/* Quelques chifres */}
      <Summary summary={{}}/>

      
      {/* Statistiques reliées aux enseignants */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" color="textSecondary">
            Enseignants
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfsGeoPartitionPie
            isLoading={profsSummaryisLoading}
            data={profsSummary.profsByWilaya}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ClassesByProfDist
            isLoading={profsSummaryisLoading}
            data={profsSummary.classesByprof}
          />
        </Grid>
      </Grid>
      {/* Statistiques reliées aux élèves */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">Elèves</Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
            <ElevesStatCharts 
            isLoading={elevesSummaryisLoading}
            data={elevesSummary}


            />

        </Grid>
      </Grid>
    </Container>
    </Page>
  );
}

export default Statistiques;
