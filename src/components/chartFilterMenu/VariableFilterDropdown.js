import { useEffect, useRef, useState } from "react";

import GraphForm from "../GraficasScreen/GraphForm";

import { getValuesOfVar } from "../utils/getValuesOfVar";

import _uniqueId from 'lodash/uniqueId';


import { createArrayForChart, createConf } from "../utils/configChart";
import createOptionsCharts from "../utils/createOptionsCharts";
import createDataForChart from '../utils/createDataForChart';

export default function VariableFilterDropdown(props){
  const [varX, setVarX] = useState(props.varX == null ? props.atributos[0] : props.varX);
  const [varY, setVarY] = useState(props.varY == null ? props.atributos[0] : props.varY);

  const handleVarXForm = (value) => {
    setVarX(value);
  };

  const handleVarYForm = (value) => {
    setVarY(value);
  };
  
  const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, varY));
  const [valueY, setValueY] = useState(props.valY == null ? optionsValueY[0] : props.valY);

  useEffect(() => {
    setOptionsValueY(getValuesOfVar(props.dataModelo, varY));
  }, [varY])

  const handleValueYForm = (value) => {
    setValueY(value);
  }

  const optionsCharts = createOptionsCharts(props.analysis, varX, varY, valueY);

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
      maxValAnomalias: maxValAnomalias,
      varX: varX,
      varY: varY,
      valY: valueY
    };

    props.setCharts(newCharts);

  }

    return(
        <div className ="subMenu">
            <ul className ="subMenu--list">
            
            {
            props.analysis === "Anomalías" ?
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