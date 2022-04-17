import React from "react";
import "./chartFilterPopMenu.css";
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropDownMenuOption from "./DropDownMenuOption";

export default function ChartFilterPopMenu(){

    //

    return(
        <div className ="filterMenu">
            <ul className ="filterMenu--list">
                <li><DropDownMenuOption iconLeft={faSort} textDisplay="Ordenar eje" expandable={true}/></li>
                <li><DropDownMenuOption iconLeft={faArrowsRotate} textDisplay="Cambiar variables" expandable={true}/></li>
                <li><DropDownMenuOption iconLeft={faCalendarDays} textDisplay="Fecha" expandable={true}/></li>
                <li><DropDownMenuOption iconLeft={faCog} textDisplay="Rango de anomalia" expandable={true}/></li>
                <li><DropDownMenuOption iconLeft={faXmark} textDisplay="Quitar" expandable={true}/></li>
            </ul>
        </div>
    );
}