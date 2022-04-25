import React from "react";
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

export default function ChartFilterPopMenu(props){

    const [isOpenAxis, setIsOpenAxis] = React.useState(false);
    function toggleAxisFilter(){
        setIsOpenAxis(isOpenAxis => !isOpenAxis);
    }

    const [isOpenVariables, setIsOpenVariables] = React.useState(false);
    function toggleVariablesFilter(){
        setIsOpenVariables(isOpenVariables => !isOpenVariables);
    }

    return(
        <ul className="masterMenu">
            <li className ="filterMenu">
                <ul className ="filterMenu--list">
                    <li onClick={toggleAxisFilter}><DropDownMenuOption iconLeft={faSort} textDisplay="Ordenar eje" expandable={true} isOpen={isOpenAxis}/></li>
                    <li onClick={toggleVariablesFilter}><DropDownMenuOption iconLeft={faArrowsRotate} textDisplay="Cambiar variables" expandable={true} isOpen={isOpenVariables}/></li>
                    <li><DropDownMenuOption iconLeft={faCalendarDays} textDisplay="Fecha" expandable={true}/></li>
                    <li><DropDownMenuOption iconLeft={faCog} textDisplay="Rango de anomalia" expandable={true}/></li>
                    <li onClick={props.closeClick}><DropDownMenuOption iconLeft={faXmark} textDisplay="Quitar" expandable={false}/></li>
                </ul>
            </li>
            {isOpenAxis && <AxisFilterDropdown/>}
            {isOpenVariables && <VariableFilterDropdown/>}
        </ul>
    );
}