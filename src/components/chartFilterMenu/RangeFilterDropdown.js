import { useEffect, useRef, useState } from "react";
import RangeSlider from "../GraficasScreen/RangeSlider";

import { getValuesOfVar } from "../utils/getValuesOfVar";

import { createArrayForChart, createConf } from "../utils/configChart";
import createOptionsCharts from "../utils/createOptionsCharts";
import createDataForChart from '../utils/createDataForChart';

export default function RangeFilterDropdown(props){

    const [minValAnomalias, setMinValAnomalias] = useState(props.minValAnomalias);
    const [maxValAnomalias, setMaxValAnomalias] = useState(props.maxValAnomalias);

    const [varX, setVarX] = useState(props.varX == null ? props.atributos[0] : props.varX);
    const [varY, setVarY] = useState(props.varY == null ? props.atributos[0] : props.varY);

    const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, varY));
    const [valueY, setValueY] = useState(props.valY == null ? optionsValueY[0] : props.valY);
    
    const optionsCharts = createOptionsCharts(props.analysis, varX, varY, valueY);

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

      useEffect(() => {
        handleChangeVariableChart();
      }, [minValAnomalias, maxValAnomalias])

    return(
        <div className ="subMenu">
            <div className ="w-80">
                <ul className="flex justify-between ml-4 mr-4 pt-2">
                    <li className="">
                                <p className="text-[12px]">mínimo</p>
                                
                    </li>
                    <li className="">
                                <p className="text-[12px]">máximo</p>
                                
                    </li>
                </ul>
                <RangeSlider
                  startMinVal={minValAnomalias*100}
                  startMaxVal = {maxValAnomalias*100}
                  min={-100}
                  max={100}
                  onChange={({ min, max }) => {
                       setMinValAnomalias(min/100)
                       setMaxValAnomalias(max/100)
                  }}/>  
            </div>
        </div>
    )
}