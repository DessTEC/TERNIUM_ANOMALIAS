import React from "react";
import { faSortAlphaAsc } from '@fortawesome/free-solid-svg-icons'
import { faSortAlphaDesc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDownMenuOption from "./DropDownMenuOption";


export default function AxisFilterDropdown(){
    return(
        <div className ="filterMenu">
            <ul className ="filterMenu--list">
                <li><DropDownMenuOption iconLeft={faSortAlphaAsc} textDisplay="Ordenar ascendente" expandable={false}/></li>
                <li><DropDownMenuOption iconLeft={faSortAlphaDesc} textDisplay="Ordenar descendente" expandable={false}/></li>
            </ul>
        </div>
    )
}