import { useEffect, useRef, useState } from "react";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GraphForm from "../GraficasScreen/GraphForm";
import { getValuesOfVar } from "../utils/getValuesOfVar";

export default function VariableFilterDropdown(props){

  const [varX, setVarX] = useState(props.atributos[0]);
  const [varY, setVarY] = useState(props.atributos[0]);

  const handleVarXForm = (value) => {
    setVarX(value);
  };

  const handleVarYForm = (value) => {
    setVarY(value);
  };
  
  useEffect(() => {
    setOptionsValueY(getValuesOfVar(props.dataModelo, varY));
  }, [varY])

  const handleValueYForm = (value) => {
    setValueY(value);
  }

  const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, varY));
  const [valueY, setValueY] = useState(optionsValueY[0]);

    return(
        <div className ="subMenu">
            <ul className ="subMenu--list">
            {props.analysis === "Anomalías" ?
            <li>
            <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
            </li>
            :
            <>
                <li>
                  <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
                </li>
                <li>
                  <GraphForm text="Eje Y" atributos={props.atributos} valueSelect={varY} handleSelect={handleVarYForm}/>
                </li>
                <li>
                {props.chartType !== "burbuja" ?  
                  <GraphForm text="Valor Y" atributos={optionsValueY} valueSelect={valueY} handleSelect={handleValueYForm}/>
                  :
                  <></> 
                } 
                </li>
              </>
            }
            </ul>
        </div>
    )
}