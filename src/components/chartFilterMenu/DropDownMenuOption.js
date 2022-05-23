import React from "react";
import { useRef, useEffect, useState } from "react"
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useParams } from "react-router-dom";
import axios from "axios";


export default function DropDownMenuOption(props){

    const params = useParams();
    const [modeloId, setReporteId] = useState(params.modeloId);

    const [isOpenOption, setIsOpenOption] = React.useState(false);

    const ref = useRef();

  
    const handleClick = () => {
        setIsOpenOption(true);
    };
  
    useEffect(() => {
      const checkClickOutside = (e) => {
        if (isOpenOption && ref.current && !ref.current.contains(e.target)) {
            setIsOpenOption(false);
        }
      };

      document.addEventListener("click", checkClickOutside);
  
      return () => {
        document.removeEventListener("click", checkClickOutside);
      };
    }, [isOpenOption]);

    const updateGraficas = async(graficas) => {
        const result = await axios.put(
            "http://localhost:4000/updateGraficas", {params: {id: modeloId, newGraficas: graficas }}, 
        );
       
    }

    function toggleFilter(){
        setIsOpenOption(isOpenOption => !isOpenOption);
        if(props.textDisplay === "Quitar"){
            let updateCharts = []
            props.charts.map(function(chart){
                if(chart["id"] != props.id)
                    updateCharts.push(chart)
            })

            updateGraficas(updateCharts)
            props.setCharts(updateCharts)
        }
    }

    let arrowIcon = isOpenOption ? faAngleDown : faAngleRight

    return(
        
    <div ref={ref}>
        <li className="filterMenu--listItem">
        <div className ="filterMenu--option" onClick={toggleFilter}>
            <div>
                <FontAwesomeIcon icon={props.iconLeft} className="w-4 h-4 mr-2 -ml-1" />
                {props.textDisplay}        
                {props.expandable ? <FontAwesomeIcon icon={arrowIcon} className="w-4 h-4 mr-2 -ml-1 absolute right-2" /> : <></>}
            </div>
        </div>
        {props.expandable && isOpenOption && props.subMenu}
        </li>
    </div>

    )
}