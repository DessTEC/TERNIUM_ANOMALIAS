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
    //const [isOpen, setIsOpen] = React.useState(false);
    /*function toggle(){
        setIsOpen(isOpen => !isOpen);
    }*/

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
  

    const [isOpenAxis, setIsOpenAxis] = React.useState(false);
    function toggleAxisFilter(){
        setIsOpenAxis(isOpenAxis => !isOpenAxis);
    }

    const [isOpenVariables, setIsOpenVariables] = React.useState(false);
    function toggleVariablesFilter(){
        setIsOpenVariables(isOpenVariables => !isOpenVariables);
    }

    const [isOpenCalendar, setIsOpenCalendar] = React.useState(false);
    function toggleCalendarFilter(){
        setIsOpenCalendar(isOpenCalendar => !isOpenCalendar);
    }

    const [isOpenSlider, setIsOpenSlider] = React.useState(false);
    function toggleSliderFilter(){
        setIsOpenSlider(isOpenSlider => !isOpenSlider);
    }

    return(
        <div>
        <button type="button" id="menu-button" className="w-full mb-2 rounded-t-md rounded-b-md border border-gray-200 shadow-md bg-[#F5F5F5]" onClick={handleClick}><FontAwesomeIcon icon={faEllipsisVertical} className="color-black"  aria-expanded="true" aria-haspopup="true"/></button>
        {isMenuOpen && (            
        <ul className="masterMenu" ref={ref}>
            <li className ="filterMenu">
                <ul className ="filterMenu--list">
                    <li className="filterMenu--listItem">
                        <div className ="filterMenu--option" onClick={toggleAxisFilter}>
                            <DropDownMenuOption iconLeft={faSort} textDisplay="Ordenar eje" expandable={true} isOpen={isOpenAxis}/>
                        </div>
                        {isOpenAxis && <AxisFilterDropdown/>}
                    </li>
                    <li className="filterMenu--listItem">
                        <div className ="filterMenu--option" onClick={toggleVariablesFilter}>
                            <DropDownMenuOption iconLeft={faArrowsRotate} textDisplay="Cambiar variables" expandable={true} isOpen={isOpenVariables}/>
                        </div>
                        {isOpenVariables && <VariableFilterDropdown/>}
                    </li>
                    <li className="filterMenu--listItem">
                        <div className ="filterMenu--option" onClick={toggleCalendarFilter}>
                            <DropDownMenuOption iconLeft={faCalendarDays} textDisplay="Fecha" expandable={true} isOpen={isOpenCalendar}/>
                        </div>
                        {isOpenCalendar && <CalendarFilterDropdown/>}
                    </li>
                    <li className="filterMenu--listItem">
                        <div className ="filterMenu--option" onClick={toggleSliderFilter}>
                            <DropDownMenuOption iconLeft={faCog} textDisplay="Rango de anomalia" expandable={true} isOpen={isOpenSlider}/>
                        </div>
                        {isOpenSlider && <RangeFilterDropdown/>}
                    </li>
                    <li className="filterMenu--listItem" onClick={props.closeClick}>
                        <div className ="filterMenu--option">
                            <DropDownMenuOption iconLeft={faXmark} textDisplay="Quitar" expandable={false}/>
                        </div>
                    </li>
                </ul>
            </li>
            
        </ul>)}
        </div>
    );
}