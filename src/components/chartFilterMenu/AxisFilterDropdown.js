import React from "react";
import { faSortAlphaAsc } from '@fortawesome/free-solid-svg-icons'
import { faSortAlphaDesc } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDownMenuOption from "./DropDownMenuOption";


export default function AxisFilterDropdown(){
    return(
        <div className ="subMenu">
            <DropDownMenuOption iconLeft={faSortAlphaAsc} textDisplay="Ordenar ascendente" expandable={false}/>
            <DropDownMenuOption iconLeft={faSortAlphaDesc} textDisplay="Ordenar descendente" expandable={false}/>            
        </div>
    )
}