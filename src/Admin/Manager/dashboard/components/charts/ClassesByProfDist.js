import React from 'react'
import PropTypes from 'prop-types'

    // Components
import PieChart from '../../../../shared/charts/PieChart'
import FunnelChart from '../../../../shared/charts/FunnelChart'
import LoadingComponent from '../../../../shared/LoadingComponent'

function ClassesByProfDist(props) {
    // const {data}=props
    const data=props.data && props.data.map(el=>({_id: `${el.nom} ${el.prenom}`,count: el.count }))


    return (
        <div>
            <LoadingComponent
            controller={props.isLoading}
            component={
                <FunnelChart
                title="Classes enseignées par les enseignants"
                chartData={data}
                />
                
            }
            />
            
        </div>
    )
}

ClassesByProfDist.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired

}

export default ClassesByProfDist

