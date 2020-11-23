import React from 'react'
import PropTypes from 'prop-types'
import {Paper,Box, Typography} from '@material-ui/core';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const COLORS=["#00429d",
"#325ba8",
"#4f75af",
"#6990b3",
"#83acb2",
"#9dc9a9",
"#90ee90",
"#ffe3ca",
"#ffc6b4",
"#ffa89c",
"#ff8781",
"#ff6162",
"#ff2812",]
function BarChart(props) {
    const {chartData}= props
    return (

      
          <Paper>
            <Box display="flex" flexDirection="row" justifyContent="center">
        <Typography variant="caption" color="textSecondary" align="center">
          {props.title}
        </Typography>
      </Box>
            <Chart
              data={chartData}
            >
              <ArgumentAxis />
              <ValueAxis />
    
              <BarSeries
                valueField={props.yName}
                argumentField={props.xName}
              />
              {/* <Title text={props.title} /> */}
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

