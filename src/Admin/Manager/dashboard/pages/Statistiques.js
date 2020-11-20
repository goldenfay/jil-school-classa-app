import React, { useEffect, useState } from "react";
import { Box, Grid, Container, Typography } from "@material-ui/core";
// Components

import ProfsGeoPartitionPie from "../components/charts/ProfsGeoPartition"

// Services
import ManagerService from "../../../../services/managerServices"


function Statistiques(props) {

    useEffect(()=>{
        ManagerService.getProfsStatistics({adminType: "manager"}).then(
            res=>{
                console.log(res);
                setProfsSummary(res)
                setProfsSummaryisLoading(false)

            },
            err=>{

            }
        )


    },[])


        // Loading flags states
    const [profsSummaryisLoading,setProfsSummaryisLoading]=useState(true)
    const [elevesSummaryisLoading,setElevesSummaryisLoading]=useState(true)
        // Data states
    const [profsSummary,setProfsSummary]=useState({profsByWilaya: []})
    const [elevesSummary,setElevesSummary]=useState({profsByWilaya: []})
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">Quelques chiffres</Typography>
        </Grid>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}></Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
      {/* Statistiques reliées aux enseignants */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">Enseignants</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <ProfsGeoPartitionPie 
            isLoading={profsSummaryisLoading}
            data={profsSummary.profsByWilaya}


            />

        </Grid>
      </Grid>
      {/* Statistiques reliées aux élèves */}
      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="textPrimary">Elèves</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
            <ProfsGeoPartitionPie 
            isLoading={elevesSummaryisLoading}
            data={elevesSummary.profsByWilaya}


            />

        </Grid>
      </Grid> */}
    </Container>
  );
}

export default Statistiques;
