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
                        <div className ="filterMenu--option">
                            <DropDownMenuOption iconLeft={faCalendarDays} textDisplay="Fecha" expandable={true}/>
                        </div>
                    </li>
                    <li className="filterMenu--listItem">
                        <div className ="filterMenu--option">
                            <DropDownMenuOption iconLeft={faCog} textDisplay="Rango de anomalia" expandable={true}/>
                        </div>
                    </li>
                    <li className="filterMenu--listItem" onClick={props.closeClick}>
                        <div className ="filterMenu--option">
                            <DropDownMenuOption iconLeft={faXmark} textDisplay="Quitar" expandable={false}/>
                        </div>
                    </li>
                </ul>
            </li>
            
        </ul>
    );
}