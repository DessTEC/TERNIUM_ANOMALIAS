import React from "react";
import { Doughnut } from 'react-chartjs-2';

export const DonaChart = ({ chartData, options }) => {
    return <Doughnut options= {options} data={chartData} />;
  }