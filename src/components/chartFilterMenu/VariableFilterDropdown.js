import { useEffect, useRef, useState } from "react";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GraphForm from "../GraficasScreen/GraphForm";

import { createArrayChart } from "../utils/createArrayChart";
import { createArrayCorrelacion } from "../utils/createArrayCorrelacion";
import { createArrayBurbuja } from "../utils/createArrayBurbuja";
import { getValuesOfVar } from "../utils/getValuesOfVar";

import _uniqueId from 'lodash/uniqueId';

export default function VariableFilterDropdown(props){
  
  const optionsCharts = {
    barrasV: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          stacked: true,
          title: {
            display:true,
            text: "Variable",
            font: {
              size: 14
            }
          }
        },
        y: {
          stacked: true,
          title: {
            display:true,
            text: "Total de datos",
            font: {
              size: 14
            }
          }
        },
      },
    },
    barrasH: {
      responsive: true,
      indexAxis: 'y',
      maintainAspectRatio: true,
      scales: {
        x: {
          stacked: true,
          title: {
            display:true,
            text: "",
            font: {
              size: 14
            }
          }
        },
        y: {
          stacked: true,
          title: {
            display:true,
            text: "",
            font: {
              size: 14
            }
          } 
        },
      },
    },
    burbuja: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          title: {
            display:true,
            text: "",
            font: {
              size: 14
            }
          }
        },
        y: {
          title: {
            display:true,
            text: "",
            font: {
              size: 14
            }
          } 
        },
      }
    }
  }
  const [varX, setVarX] = useState(props.atributos[0]);
  const [varY, setVarY] = useState(props.atributos[0]);

  const handleVarXForm = (value) => {
    setVarX(value);
    handleChangeVariableChart();
  };

  const handleVarYForm = (value) => {
    setVarY(value);
    handleChangeVariableChart();
  };
  
  useEffect(() => {
    setOptionsValueY(getValuesOfVar(props.dataModelo, varY));
  }, [varY])

  const handleValueYForm = (value) => {
    setValueY(value);
    handleChangeVariableChart();
  }

  const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, varY));
  const [valueY, setValueY] = useState(optionsValueY[0]);


  const handleChangeVariableChart = () =>{
    const id = props.id;

    let arrayForChart;

    if(props.chartType !== "burbuja"){
      if(props.analysis === 'Anomalías'){
        arrayForChart = createArrayChart(props.dataModelo, varX);
      }else{
        arrayForChart = createArrayCorrelacion(props.dataModelo, varX, varY, valueY);
      }
    }else{
      arrayForChart = createArrayBurbuja(props.dataModelo, varX, varY);
    }
 
    let conf = {...optionsCharts[props.chartType]};

    switch(props.chartType){
      case "barrasV":
        conf["scales"]["x"]["title"]["text"] = varX;
        conf["scales"]["y"]["title"]["text"] = "Total de datos";
        break;
      case "barrasH":
        conf["scales"]["x"]["title"]["text"] = "Total de datos";
        conf["scales"]["y"]["title"]["text"] = varX;
        break;
      case "burbuja":
        conf["scales"]["x"]["title"]["text"] = varX;
        conf["scales"]["y"]["title"]["text"] = varY;
        break;
      default:
        
    }

    if(props.chartType !== "burbuja" && props.analysis === "Correlación"){
      conf["scales"]["y"]["title"]["text"] += `(${varY}:${valueY}))`;
    }

    let dataChart;
    if(props.chartType !== "burbuja"){
      dataChart = {
        labels: arrayForChart.map((data) => data.value),
        datasets: [
          {
            label: "Relaciones Normales",
            data: arrayForChart.map((data) => data.normales),
            backgroundColor: ["#FAAD42"],
          },
          {
            label: "Relaciones Anómalas",
            data: arrayForChart.map((data) => data.anomalias),
            backgroundColor: ["#F25C29"],
          },
        ],
      };
    }else{
      dataChart = {
        datasets: [
          {
            label: "Relaciones Anómalas",
            data: arrayForChart["anomalias"],
            backgroundColor: 'rgba(242, 92, 41, 0.5)',
          },
          {
            label: "Relaciones Normales",
            data: arrayForChart["normales"],
            backgroundColor: 'rgba(250, 173, 66, 0.5)',
          }
        ],
      };
    }

    let newCharts = [...props.charts]; 
    newCharts[props.charts.findIndex((element) => element.id === id)] = {
      id: id,
      type: props.chartType,
      data: dataChart,
      options: conf,
      analysis: props.analysis
    };

    props.setCharts(newCharts);

  }

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