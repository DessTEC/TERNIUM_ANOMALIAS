import { ChartWrapper } from "../charts/ChartWrapper";
import AddGraph from "./AddGraph";
import DownloadButton from "./DownloadButton";
import {useState} from 'react';

import { exportMultipleChartsToPdf } from "../utils/exportPdf";

export const GraficasScreen = () => {

  const [charts, setCharts] = useState([]);
  const [selectCharts, setSelectCharts] = useState([]);

  return (
    <div>
      <div className="flex justify-end mt-2">
        <DownloadButton 
          selectCharts={selectCharts}
          exportMultipleChartsToPdf={exportMultipleChartsToPdf}
        />
        <AddGraph 
          text="Agregar gráfica"
          setCharts = {setCharts}
          charts = {charts}
        />
      </div>

      {charts.length > 0 ? 
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly justify-items-center" id="reporte">
          {
            charts.map( chart => {
                return(
                        <ChartWrapper 
                        key = {chart.id}
                        chartData = {chart.data}
                        options = {chart.options}
                        type = {chart.type}
                        setSelectCharts = {setSelectCharts}
                        chartId = {chart.id}
                      />
                );
            })
          }
        </div> 
        :
        <div>
          <h2>Agrega una gráfica</h2>
        </div>
      }
    </div>
  );
};
