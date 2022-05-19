import { useEffect, useRef, useState } from "react";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GraphForm from "../GraficasScreen/GraphForm";

import { createArrayBarrasAnom } from "../utils/createArrayBarrasAnom";
import { createArrayBarrasCorrPun } from "../utils/createArrayBarrasCorrPun";
import { createArrayBurbuja } from "../utils/createArrayBurbuja";
import { getValuesOfVar } from "../utils/getValuesOfVar";

import _uniqueId from 'lodash/uniqueId';


import { createArrayForChart, createConf } from "../utils/configChart";
import createOptionsCharts from "../utils/createOptionsCharts";
import createDataForChart from '../utils/createDataForChart';

export default function VariableFilterDropdown(props){
  
  const [varX, setVarX] = useState(props.atributos[0]);
  const [varY, setVarY] = useState(props.atributos[0]);

  const handleVarXForm = (value) => {
    setVarX(value);
   // handleChangeVariableChart();
  };

  const handleVarYForm = (value) => {
    setVarY(value);
   // handleChangeVariableChart();
  };
  
  useEffect(() => {
    setOptionsValueY(getValuesOfVar(props.dataModelo, varY));
  }, [varY])

  const handleValueYForm = (value) => {
    setValueY(value);
    //handleChangeVariableChart();
  }

  const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, varY));
  const [valueY, setValueY] = useState(optionsValueY[0]);

  const optionsCharts = createOptionsCharts(props.analysis, varX, varY, valueY);

  console.log(props.maxValAnomalias);
  console.log(props.minValAnomalias);
  const [minValAnomalias, setMinValAnomalias] = useState(props.minValAnomalias);
  const [maxValAnomalias, setMaxValAnomalias] = useState(props.maxValAnomalias);

  useEffect(() => {
    handleChangeVariableChart();
  }, [varY, varX, valueY])

  const handleChangeVariableChart = () =>{
    const id = props.id;

    let arrayForChart = createArrayForChart(props.dataModelo, props.analysis, props.chartType, varX, varY, valueY, minValAnomalias, maxValAnomalias);

    let conf = createConf({...optionsCharts[ props.chartType]}, props.analysis,  props.chartType, varX, varY, valueY);

    let dataChart = createDataForChart( props.chartType, arrayForChart);

    let newCharts = [...props.charts]; 
    newCharts[props.charts.findIndex((element) => element.id === id)] = {
      id: id,
      type: props.chartType,
      data: dataChart,
      options: conf,
      analysis: props.analysis,
      minValAnomalias: minValAnomalias,
      maxValAnomalias: maxValAnomalias
    };

    props.setCharts(newCharts);

  }

    return(
        <div className ="subMenu">
            <ul className ="subMenu--list">
            {props.analysis === "Anomalías" ?
            <li>
            <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
            </li>
            :
            <>
                <li>
                  <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
                </li>
                <li>
                  <GraphForm text="Eje Y" atributos={props.atributos} valueSelect={varY} handleSelect={handleVarYForm}/>
                </li>
                <li>
                {props.chartType !== "burbuja" & props.analysis === "Correlación Puntual" ?  
                  <GraphForm text="Valor Y" atributos={optionsValueY} valueSelect={valueY} handleSelect={handleValueYForm}/>
                  :
                  <></> 
                } 
                </li>
              </>
            }
            </ul>
        </div>
    )
}