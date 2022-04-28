import React from "react";
import { faSortAlphaAsc } from '@fortawesome/free-solid-svg-icons'
import { faSortAlphaDesc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDownMenuOption from "./DropDownMenuOption";


export default function AxisFilterDropdown(){
    return(
        <div className ="subMenu">
            <ul className ="subMenu--list">
                <li>
                    <div className ="filterMenu--option">
                    <DropDownMenuOption iconLeft={faSortAlphaAsc} textDisplay="Ordenar ascendente" expandable={false}/></div></li>
                <li><div className ="filterMenu--option">
                    <DropDownMenuOption iconLeft={faSortAlphaDesc} textDisplay="Ordenar descendente" expandable={false}/></div></li>
            </ul>
        </div>
    )
}