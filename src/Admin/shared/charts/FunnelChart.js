import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { FunnelChart, Funnel, Tooltip } from "recharts";
import { Box, Typography } from "@material-ui/core";

const COLORS = [
    "#941191","#a34e8b","#c69464","#e9da3c","#d2dc6c","#bade9c","#8ae1fc","#48b8d0"
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Box
        bgcolor="black"
        borderRadius="10px"
        px={2}
        display="flex"
        justifyContent="center"
      >
        <p
          style={{ color: "white" }}
        >{`${payload[0].name} : ${payload[0].value}`}</p>
      </Box>
    );
  }

  return null;
};
function FunnelChartComponent(props) {
  // const {chartData}= props
  const chartData = props.chartData.map((el, index) => ({
    name: el._id,
    value: el.count,
    fill: COLORS[index % COLORS.length],
  }));
  return (
    <Paper>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Typography variant="caption" color="textSecondary" align="center">
          {props.title}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="center">
        {/* <ResponsiveContainer > */}
        <FunnelChart height={280} width={320}>
          <Tooltip content={<CustomTooltip />} />
          <Funnel dataKey="value" data={chartData} isAnimationActive>
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
};

export default FunnelChartComponent;
