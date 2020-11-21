import React from 'react'
import PropTypes from 'prop-types'

    // Components
import PieChart from '../../../../shared/charts/PieChart'
import LoadingComponent from '../../../../shared/LoadingComponent'

function ProfsGeoPartition(props) {
    const {data}=props

    return (
        <div>
            <LoadingComponent
            controller={props.isLoading}
            component={
                <PieChart 
                chartData={data}
                labelsTitle={"Wilaya"}
                valuesTitles={"Nombre"}
                valuesName={"count"}
                labelsName={"_id"}
                title={"Répartition géographique des enseignants"}
                />
            }
            />
            
        </div>
    )
}

ProfsGeoPartition.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired

}

export default ProfsGeoPartition

