import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Box} from "@material-ui/core"
    // Components
import BarChart from '../../../../shared/charts/BarChart'
import PieChart from '../../../../shared/charts/PieChart'
import LoadingComponent from '../../../../shared/LoadingComponent'

function ElevesStatCharts(props) {
    const {data}=props

    return (
        <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>

        <Box display="flex" justifyContent="center" width="100%">
            <LoadingComponent
            controller={props.isLoading}
            component={
                <PieChart 
                chartData={data.elevesBySexe}
                labelsTitle={"Sexe"}
                valuesTitles={"Nombre"}
                valuesName={"count"}
                labelsName={"_id"}
                title={"Distribution du genre des élèves"}
                />
            }
            />
            
        </Box>
        </Grid>


        <Grid item xs={12} sm={6}>

        <Box display="flex" justifyContent="center" width="100%">
            <LoadingComponent
            controller={props.isLoading}
            component={
                <BarChart 
                chartData={data.elevesByAge}
                xName={"_id"}
                yName={"count"}
                xTitle={"Age"}
                yTitle={"Nombre"}
               
               
                title={"Répartition d'âge des élèves"}
                />
            }
            />
            
        </Box>
        </Grid>
        </Grid>
          
    )
}

ElevesStatCharts.propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired

}

export default ElevesStatCharts

