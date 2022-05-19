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

import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';


export default function ChartFilterPopMenu(props){

    const ref = useRef();

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
            <DropDownMenuOption iconLeft={faCalendarDays} subMenu={<CalendarFilterDropdown/>} textDisplay="Fecha" expandable={true}/>
            <DropDownMenuOption iconLeft={faCog} subMenu={<RangeFilterDropdown/>} textDisplay="Rango de anomalía" expandable={true}/>
            <DropDownMenuOption iconLeft={faXmark} subMenu={<></>} textDisplay="Quitar" expandable={false} chartIndex={props.chartIndex} charts={props.charts} setCharts={props.setCharts}/>
        </>
        ]

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