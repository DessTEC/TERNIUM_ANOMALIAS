import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Divider from "./Divider";
import GraphForm from "./GraphForm";
import RangeSlider from "./RangeSlider";
import {ButtonGroupCharts} from "./ButtonGroupCharts";
import { ButtonGroupCor } from "./ButtonGroupCor";

import _uniqueId from 'lodash/uniqueId';

import { createArrayBarrasAnom } from "../utils/createArrayBarrasAnom";
import { createArrayBarrasCorrPun } from "../utils/createArrayBarrasCorrPun";
import { createArrayBurbuja } from "../utils/createArrayBurbuja";
import { createArrayDonaAnom } from "../utils/createArrayDonaAnom";
import { getValuesOfVar } from "../utils/getValuesOfVar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { createArrayDonaCorrPun } from "../utils/createArrayDonaCorrPun";
import { createArrayDonaCorrGen } from "../utils/createArrayDonaCorrGen";

import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import zoomPlugin  from 'chartjs-plugin-zoom';

import { createArrayBarrasCorrGen } from "../utils/createArrayBarrasCorrGen";

import {createArrayForChart, createConf} from '../utils/configChart'
import createDataForChart from '../utils/createDataForChart'
import createOptionsCharts from "../utils/createOptionsCharts";

Chart.register(ChartDataLabels);
Chart.register(zoomPlugin);


export default function AddGraph(props) {
  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Selección de gráficas

  //Variables de configuración
  const [chartType, setChartType] = useState("barras");
  const [analysisType, setAnalysisType] = useState('Anomalías');

  const [varX, setVarX] = useState(props.atributos[0]);
  const [varY, setVarY] = useState(props.atributos[0]);

  const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, varY));
  const [valueY, setValueY] = useState(optionsValueY[0]);

  const [minValAnomalias, setMinValAnomalias] = useState(-100);
  const [maxValAnomalias, setMaxValAnomalias] = useState(100);
  const params = useParams();
  const [modeloId, setReporteId] = useState(params.modeloId);


  const subirGrafica = async(grafica) => {

    const result = await axios.put(
        "http://localhost:4000/addGrafica", {params: {id: modeloId, newGrafica: grafica}}, 
    );
    console.log(result);
   
}

  const handleClick = () => {
    setIsMenuOpen(true);
  };

  const handleVarXForm = (value) => {
    setVarX(value);
  };

  const handleVarYForm = (value) => {
    setVarY(value);
  };

  useEffect(() => {
    setOptionsValueY(getValuesOfVar(props.dataModelo, varY));
  }, [varY])
  
  useEffect(() => {
    setValueY(optionsValueY[0]);
  }, [optionsValueY])

  useEffect(() => {
    if(chartType === "burbuja"){
      setAnalysisType("Correlación General");
    }
  }, [chartType])

  const handleValueYForm = (value) => {
    setValueY(value);
  }

  useEffect(() => {
    const checkClickOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", checkClickOutside);

    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [isMenuOpen]);

  const handleCreateChart = () => {
    setIsMenuOpen(false);
    const id = props.graficaId;
    props.setGraficaId(id + 1);
    const optionsCharts = createOptionsCharts(analysisType, varX, varY, valueY);

    let arrayForChart = createArrayForChart(props.dataModelo, analysisType, chartType, varX, varY, valueY, minValAnomalias, maxValAnomalias, null, null);

    let conf = createConf({...optionsCharts[chartType]}, analysisType, chartType, varX, varY, valueY);

    let dataChart = createDataForChart(chartType, arrayForChart);

    props.setCharts(prevCharts => [...prevCharts, {
      id: id,
      type: chartType,
      data: dataChart,
      options: conf,
      analysis: analysisType,
      minValAnomalias: minValAnomalias,
      maxValAnomalias: maxValAnomalias,
      varX: varX,
      varY:varY,
      valY:valueY,
      minDate: null,
      maxDate: null
    }])

    subirGrafica({
      id: id,
      type: chartType,
      data: dataChart,
      options: conf,
      analysis: analysisType,
      minValAnomalias: minValAnomalias,
      maxValAnomalias: maxValAnomalias,
      varX: varX,
      varY:varY,
      valY:valueY,
      minDate: null,
      maxDate: null
    })
  }

  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={handleClick}
            type="button"
            className="flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2.5 bg-[#F25C29] text-sm font-medium text-white hover:bg-[#D35124]"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2 -ml-1 " />
            {props.text}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-auto p-8 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            ref={ref}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <h4 className="text-lg font-bold pl-5">Tipo de gráfica</h4>
              <Divider borColor="border-black"/>
              <div className="flex justify-center py-3 px-3">
                <ButtonGroupCharts
                  setChartType={setChartType}
                  chartType = {chartType}
                />
              </div>

              <h4 className="text-lg font-bold pl-5 pt-2">Comparativa</h4>
              <Divider borColor="border-black"/>
              <div className="flex justify-start items-center py-3 px-3">
                <ButtonGroupCor
                  setAnalysisType={setAnalysisType}
                  analysisType={analysisType}
                  chartType = {chartType}
                />
              </div>

              <h4 className="text-lg font-bold pl-5 pt-2">Variable (s)</h4>
              <Divider borColor="border-black"/>
              {analysisType === "Anomalías" ?
                <div className="grid grid-cols-2 pt-3 px-3">
                  <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
                </div>
                :
                <div className="grid grid-cols-2 pt-3 px-3">
                  <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
                  <GraphForm text="Eje Y" atributos={props.atributos} valueSelect={varY} handleSelect={handleVarYForm}/>
                  {chartType !== "burbuja" & analysisType === "Correlación Puntual" ?  
                    <div className="col-start-2">
                      <GraphForm text="Valor Y" atributos={optionsValueY} valueSelect={valueY} handleSelect={handleValueYForm}/>
                    </div>
                    :
                    <></>
                  } 
                </div>
              }

              <h4 className="text-lg font-bold pl-5 pt-2">Rango de anomalía</h4>
              <Divider borColor="border-black"/>
              <div className="flex items-center justify-center pb-4">
                <RangeSlider 
                  startMinVal={-100}
                  startMaxVal = {0}
                  min={-100}
                  max={100}
                  onChange={({ min, max }) => {
                    setMinValAnomalias(min/100)
                    setMaxValAnomalias(max/100)
                  }}
                />
              </div>

              <div className="flex justify-center py-2">
                <buton 
                  className=" font-medium rounded-full text-sm text-white px-24 py-2.5 text-center inline-flex items-center mr-2text-white bg-[#FF5C00] border-b-4 border-gray-300 hover:bg-[#D35124]"
                  onClick = {handleCreateChart}
                >
                  Agregar
                </buton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
