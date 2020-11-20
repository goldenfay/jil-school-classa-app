import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


function BarChart(props) {
    const {chartData}= props
    return (

      
          <Paper>
            <Chart
              data={chartData}
            >
              <ArgumentAxis />
              <ValueAxis />
    
              <BarSeries
                valueField={props.yName}
                argumentField={props.xName}
              />
              <Title text={props.title} />
              <Animation />
            </Chart>
          </Paper>
      
    )
}

BarChart.propTypes = {
    chartData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    xTitle: PropTypes.string.isRequired,
    yTitle: PropTypes.string.isRequired,
    xName: PropTypes.string.isRequired,
    yName: PropTypes.string.isRequired,

}

export default BarChart

