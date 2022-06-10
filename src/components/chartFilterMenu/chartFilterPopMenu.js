import React from "react";
import { useEffect, useRef, useState } from "react";
import "./chartFilterPopMenu.css";
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDownMenuOption from "./DropDownMenuOption";
import AxisFilterDropdown from "./AxisFilterDropdown";
import VariableFilterDropdown from "./VariableFilterDropdown";
import CalendarFilterDropdown from "./CalendarFilterDropdown";
import RangeFilterDropdown from "./RangeFilterDropdown";
import createOptionsCharts from "../utils/createOptionsCharts";
import { getValuesOfVar } from "../utils/getValuesOfVar";
import createDataForChart from "../utils/createDataForChart";
import { createConf } from "../utils/configChart";
import { createArrayForChart } from "../utils/configChart";

import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';


export default function ChartFilterPopMenu(props){
    //console.log(props.analysisType)
    const ref = useRef();

    //const [varX, setVarX] = useState(props.varX == null ? props.atributos[0] : props.varX);
    //const [varY, setVarY] = useState(props.varY == null ? props.atributos[0] : props.varY);
    //const [valueY, setValueY] = useState(props.valY == null ? optionsValueY[0] : props.valY);
    //const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, props.varY));
  
    const [inputValueStart, setInputValueStart] = useState('');
    const [inputValueEnd, setInputValueEnd] = useState('');

    const [initDate, setInitDate] = React.useState(props.minDate);
    const [endDate, setEndDate] = React.useState(props.maxDate);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleClick = () => {
      setIsMenuOpen(true);
    };
  
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

    const [selectedAxis, setSelectedAxis] = useState(0);

    const options = [
        <>
            <DropDownMenuOption iconLeft={faArrowsRotate} subMenu={<VariableFilterDropdown atributos={props.atributos} analysis={props.analysisType} chartType={props.chartType} dataModelo={props.dataModelo} setCharts = {props.setCharts} id={props.id} charts={props.charts} minValAnomalias={props.minValAnomalias} maxValAnomalias={props.maxValAnomalias} varX = {props.varX} varY={props.varY} valY={props.valY}/>} textDisplay="Cambiar variables" expandable={true}/>
            <DropDownMenuOption iconLeft={faCalendarDays} subMenu={<CalendarFilterDropdown initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} inputValueStart = {inputValueStart} setInputValueStart = {setInputValueStart} inputValueEnd = {inputValueEnd} setInputValueEnd = {setInputValueEnd} minCalendarVal = {props.calendarMin} maxCalendarVal={props.calendarMax}/>} textDisplay="Fecha" expandable={true}/>
            <DropDownMenuOption iconLeft={faCog} subMenu={<RangeFilterDropdown atributos={props.atributos} analysis={props.analysisType} chartType={props.chartType} dataModelo={props.dataModelo} setCharts = {props.setCharts} id={props.id} charts={props.charts} minValAnomalias={props.minValAnomalias} maxValAnomalias={props.maxValAnomalias} varX = {props.varX} varY={props.varY} valY={props.valY}/>} textDisplay="Rango de anomalía" expandable={true}/>
            <DropDownMenuOption iconLeft={faXmark} subMenu={<></>} textDisplay="Quitar" expandable={false} chartIndex={props.chartIndex} charts={props.charts} setCharts={props.setCharts} id={props.id}/>
        </>
    ]

  const optionsCharts = createOptionsCharts(props.analysisType, props.varX, props.varY, props.valY);

  const [minValAnomalias, setMinValAnomalias] = useState(props.minValAnomalias);
  const [maxValAnomalias, setMaxValAnomalias] = useState(props.maxValAnomalias);

  useEffect(() => {
    handleChangeDateChart();
    //console.log(initDate);
    //console.log(endDate);
  }, [initDate, endDate])

  const handleChangeDateChart = () =>{
    const id = props.id;

    let arrayForChart = createArrayForChart(props.dataModelo, props.analysisType, props.chartType, props.varX, props.varY, props.valY, minValAnomalias, maxValAnomalias, initDate, endDate);

    let conf = createConf({...optionsCharts[ props.chartType]}, props.analysisType,  props.chartType, props.varX, props.varY, props.valY);

    let dataChart = createDataForChart( props.chartType, arrayForChart);

    let newCharts = [...props.charts]; 
    newCharts[props.charts.findIndex((element) => element.id === id)] = {
      id: id,
      type: props.chartType,
      data: dataChart,
      options: conf,
      analysis: props.analysisType,
      minValAnomalias: minValAnomalias,
      maxValAnomalias: maxValAnomalias,
      varX: props.varX,
      varY: props.varY,
      valY: props.valY,
      minDate: initDate,
      maxDate: endDate
    };

    props.setCharts(newCharts);

  }

    return(
        <div>
        <button type="button" id="menu-button" className="w-full mb-2 rounded-t-md rounded-b-md border border-gray-200 shadow-md bg-[#F5F5F5]" onClick={handleClick}><FontAwesomeIcon icon={faEllipsisVertical} className="color-black"  aria-expanded="true" aria-haspopup="true"/></button>
        {isMenuOpen && (            
        <ul className="masterMenu" ref={ref}>
            <li className ="filterMenu">
                <ul className ="filterMenu--list">
                   {options}
                </ul>
            </li>
        </ul>)}
        </div>
    );
}