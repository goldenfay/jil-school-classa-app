import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper';
import {
    PieChart, Pie, Sector, Cell,Tooltip
  } from 'recharts';
import { Box, Typography } from '@material-ui/core';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
  }) => {
     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
const CustomTooltip=({ active, payload, label }) => {
    if (active) {
      return (
        <Box bgcolor="black" borderRadius="10px" className="p-3" display="flex" justifyContent="center" >
          <p style={{color: "white"}} >{`${payload[0].name} : ${payload[0].value}`}</p>
        </Box>
      );
    }
  
    return null;
  };  
function PieChartComponent(props) {
    // const {chartData}= props
    const chartData= props.chartData.map(el=>({name: el._id, value: el.count}))
    return (
        <Paper>
            <Box display="flex" flexDirection="row" justifyContent="center"><Typography variant="caption" color="textSecondary" align="center">
                {props.title}

            </Typography>
            </Box>
            <PieChart width={400} height={400} >
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          
        >
          {
            chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
          
        </Paper>
      );
}

PieChartComponent.propTypes = {
    chartData: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    labelsTitle: PropTypes.string.isRequired,
    valuesTitles: PropTypes.string.isRequired,
    labelsName: PropTypes.string.isRequired,
    valuesName: PropTypes.string.isRequired,

}

export default PieChartComponent

