import { ChartWrapper } from "../charts/ChartWrapper";
import AddGraph from "./AddGraph";
import DownloadButton from "./DownloadButton";
import {useState, useEffect} from 'react';
import axios from "axios";
import { exportMultipleChartsToPdf } from "../utils/exportPdf";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";


export const GraficasScreen = () => {

  const [dataModelo, atributos, nombreModelo, diccionario, actInt, actExt, calendarMin, calendarMax] = useOutletContext();
  const [charts, setCharts] = useState([]);
  const [selectCharts, setSelectCharts] = useState([]);
  const params = useParams();
  const [modeloId, setReporteId] = useState(params.modeloId);
  const [graficaId, setGraficaId] = useState(0)


  useEffect(() => {
    getGraficas();
  }, [])

  const getGraficas = async() => {
      const result = await axios.get(
          "http://localhost:4000/getGraficas", {params: {id: modeloId }}, 
      );
      setCharts(result["data"]["graficas"])
      setGraficaId(result["data"]["idCounter"])
      console.log(result);
  }

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
          graficaId = {graficaId}
          setGraficaId = {setGraficaId}
          dataModelo = {dataModelo}
          atributos = {atributos}
        />
      </div>

      {charts.length > 0 ? 
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-evenly justify-items-center" id="reporte">
          {
            charts.map( (chart, index) => {
              //console.log(chart.analysis)
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
                        minValAnomalias = {chart.minValAnomalias}
                        maxValAnomalias = {chart.maxValAnomalias}
                        varX = {chart.varX}
                        varY = {chart.varY}
                        valY = {chart.valY}
                        minDate = {chart.minDate}
                        maxDate = {chart.maxDate}
                        calendarMin = {calendarMin}
                        calendarMax = {calendarMax}
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
