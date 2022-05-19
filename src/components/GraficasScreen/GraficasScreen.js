import { ChartWrapper } from "../charts/ChartWrapper";
import AddGraph from "./AddGraph";
import DownloadButton from "./DownloadButton";
import {useState} from 'react';

import { exportMultipleChartsToPdf } from "../utils/exportPdf";
import { useOutletContext } from "react-router-dom";

export const GraficasScreen = () => {

  const [dataModelo, atributos] = useOutletContext();

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
          dataModelo = {dataModelo}
          atributos = {atributos}
        />
      </div>

      {charts.length > 0 ? 
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly justify-items-center" id="reporte">
          {
            charts.map( (chart, index) => {
                return(
                        <ChartWrapper 
                        key = {chart.id}
                        chartData = {chart.data}
                        options = {chart.options}
                        type = {chart.type}
                        setSelectCharts = {setSelectCharts}
                        chartId = {chart.id}
                        analysisType = {chart.analysis}
                        atributos = {atributos}
                        dataModelo = {dataModelo}
                        setCharts = {setCharts}
                        charts = {charts}
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
