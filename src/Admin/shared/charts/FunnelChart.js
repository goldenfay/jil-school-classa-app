import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper';
import {
     FunnelChart,Funnel,Tooltip
  } from 'recharts';
import { Box, Typography } from '@material-ui/core';

const COLORS = ['#00429d', '#325ba8', '#4f75af', '#6990b3', '#83acb2', '#9dc9a9', '#90ee90', '#ffe3ca', '#ffc6b4', '#ffa89c', '#ff8781', '#ff6162', '#ff2812'];

const CustomTooltip=({ active, payload, label }) => {
    if (active) {
        console.log(label,payload)
      return (
        <Box bgcolor="black" borderRadius="10px" className="p-3" display="flex" justifyContent="center" >
          <p style={{color: "white"}} >{`${payload[0].name} : ${payload[0].value}`}</p>
        </Box>
      );
    }
  
    return null;
  };  
function FunnelChartComponent(props) {
    // const {chartData}= props
    const chartData= props.chartData.map((el,index)=>({name: el._id, value: el.count, fill: COLORS[Math.floor(Math.random()*COLORS.length)]}))
    return (
        <Paper>
            <Box display="flex" flexDirection="row" justifyContent="center"><Typography variant="caption" color="textSecondary" align="center">
                {props.title}

            </Typography>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
            {/* <ResponsiveContainer > */}
            <FunnelChart height={320} width={480}>
  <Tooltip content={<CustomTooltip />}/>
  <Funnel
    dataKey="value"
    data={chartData}
    isAnimationActive
  >
    {/* <LabelList position="right" fill="#000" stroke="none" dataKey="name" /> */}
  </Funnel>
</FunnelChart>
{/* </ResponsiveContainer> */}
</Box>
          
        </Paper>
      );
}

FunnelChartComponent.propTypes = {
    chartData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    // labelsTitle: PropTypes.string.isRequired,
    // valuesTitles: PropTypes.string.isRequired,
    // labelsName: PropTypes.string.isRequired,
    // valuesName: PropTypes.string.isRequired,

}

export default FunnelChartComponent

