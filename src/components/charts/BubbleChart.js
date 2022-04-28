import React from "react";
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
 
export const BubbleChart = ({ chartData, options }) => {
  return <Bubble options= {options} data={chartData} />;
}