import React from "react";
import "./chartFilterPopMenu.css";
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ChartFilterPopMenu(){

    //[isOpen, setIsOpen] = React.useState(props.isOpen);

    return(
        <div className ="filterMenu">
            <ul className ="filterMenu--list">
                <li>
                    <FontAwesomeIcon icon={faSort} className="w-4 h-4 mr-2 -ml-1" />
                    Ordenar eje
                    <FontAwesomeIcon icon={faAngleDown} className="absolute right-2" />
                </li>
                <li>
                    <FontAwesomeIcon icon={faArrowsRotate} className="w-4 h-4 mr-2 -ml-1" />
                    Cambiar variables
                    <FontAwesomeIcon icon={faAngleDown} className="absolute right-2" />
                    </li>
                <li>
                    <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4 mr-2 -ml-1" />
                    Fecha
                    <FontAwesomeIcon icon={faAngleDown} className="absolute right-2" />
                    </li>
                <li>
                    <FontAwesomeIcon icon={faCog} className="w-4 h-4 mr-2 -ml-1" />
                    Rango de anomalía
                    <FontAwesomeIcon icon={faAngleDown} className="absolute right-2" />
                    </li>
                <li>
                    <FontAwesomeIcon icon={faXmark} className="w-4 h-4 mr-2 -ml-1" />
                    Quitar
                    <FontAwesomeIcon icon={faAngleDown} className="absolute right-2" />
                    </li>
            </ul>
        </div>
    );
}