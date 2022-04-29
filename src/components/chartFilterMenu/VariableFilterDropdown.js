import React from "react";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GraphForm from "../GraficasScreen/GraphForm";

export default function VariableFilterDropdown(){
    return(
        <div className ="subMenu">
            <ul className ="subMenu--list">
                <li>
                  <GraphForm text="Eje X" />
                </li>
                <li>
                  <GraphForm text="Eje Y" />
                </li>
            </ul>
        </div>
    )
}