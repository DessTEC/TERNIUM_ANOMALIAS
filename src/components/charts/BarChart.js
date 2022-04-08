import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export const BarChart = ({ chartData, options }) => {
  return <Bar options= {options} data={chartData} />;
}