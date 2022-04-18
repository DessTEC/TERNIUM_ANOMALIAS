import React from "react";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function VariableFilterDropdown(){
    return(
        <div className ="filterMenu">
            <ul className ="subMenu--list">
                <li>
                    <div className="axisVariableSection">
                        Eje x 
                        <div className="axisVariablePicker"> 
                        Planta Transportista
                        <FontAwesomeIcon icon={faAngleDown} className="w-4 h-4 mr-2 -ml-1 mt-0.5 absolute right-2" />
                        </div>
                    </div>
                    
                </li>
                <li>
                    <div className="axisVariableSection">
                        Eje y 
                        <div className="axisVariablePicker"> 
                        Planta Transportista
                        <FontAwesomeIcon icon={faAngleDown} className="w-4 h-4 mr-2 -ml-1 mt-0.5 absolute right-2" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}