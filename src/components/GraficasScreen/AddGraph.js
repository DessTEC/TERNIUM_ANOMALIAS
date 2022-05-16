import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Divider from "./Divider";
import GraphForm from "./GraphForm";
import RangeSlider from "./RangeSlider";
import {ButtonGroupCharts} from "./ButtonGroupCharts";
import { ButtonGroupCor } from "./ButtonGroupCor";

import _uniqueId from 'lodash/uniqueId';

import { createArrayChart } from "../utils/createArrayChart";
import { createArrayCorrelacion } from "../utils/createArrayCorrelacion";
import { createArrayBurbuja } from "../utils/createArrayBurbuja";
import { getValuesOfVar } from "../utils/getValuesOfVar";


export default function AddGraph(props) {
  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Selección de gráficas

  //Variables de configuración
  const [chartType, setChartType] = useState("barrasV");
  const [analysisType, setAnalysisType] = useState('Anomalías');

  const [varX, setVarX] = useState(props.atributos[0]);
  const [varY, setVarY] = useState(props.atributos[0]);

  const [optionsValueY, setOptionsValueY] = useState(getValuesOfVar(props.dataModelo, varY));
  const [valueY, setValueY] = useState(optionsValueY[0]);

  const [minValAnomalias, setMinValAnomalias] = useState(-100);
  const [maxValAnomalias, setMaxValAnomalias] = useState(100);

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

  const handleClick = () => {
    setIsMenuOpen(true);
  };

  const handleVarXForm = (value) => {
    setVarX(value);
  };

  const handleVarYForm = (value) => {
    setVarY(value);
  };

  useEffect(() => {
    setOptionsValueY(getValuesOfVar(props.dataModelo, varY));
  }, [varY])
  
  useEffect(() => {
    setValueY(optionsValueY[0]);
  }, [optionsValueY])

  useEffect(() => {
    if(chartType === "burbuja"){
      setAnalysisType("Correlación");
    }
  }, [chartType])

  const handleValueYForm = (value) => {
    setValueY(value);
  }

  useEffect(() => {
    const checkClickOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", checkClickOutside);

    return () => {
      document.removeEventListener("click", checkClickOutside);
    };
  }, [isMenuOpen]);

  const handleCreateChart = () => {
    setIsMenuOpen(false);
    const id = _uniqueId('id-');

    let arrayForChart;

    if(chartType !== "burbuja"){
      if(analysisType === 'Anomalías'){
        arrayForChart = createArrayChart(props.dataModelo, varX);
      }else{
        arrayForChart = createArrayCorrelacion(props.dataModelo, varX, varY, valueY);
      }
    }else{
      arrayForChart = createArrayBurbuja(props.dataModelo, varX, varY);
    }
 
    let conf = {...optionsCharts[chartType]};

    switch(chartType){
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

    if(chartType !== "burbuja" && analysisType === "Correlación"){
      conf["scales"]["y"]["title"]["text"] += `(${varY}:${valueY}))`;
    }

    let dataChart;
    if(chartType !== "burbuja"){
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

    props.setCharts(prevCharts => [...prevCharts, {
      id: id,
      type: chartType,
      data: dataChart,
      options: conf
    }])
  }

  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={handleClick}
            type="button"
            className="flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2.5 bg-[#F25C29] text-sm font-medium text-white hover:bg-[#D35124]"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2 -ml-1 " />
            {props.text}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-auto p-8 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            ref={ref}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div class="py-1" role="none">
              <h4 className="text-lg font-bold pl-5">Tipo de gráfica</h4>
              <Divider borColor="border-black"/>
              <div className="flex justify-center py-3 px-3">
                <ButtonGroupCharts
                  setChartType={setChartType}
                  chartType = {chartType}
                />
              </div>

              <h4 className="text-lg font-bold pl-5 pt-2">Comparativa</h4>
              <Divider borColor="border-black"/>
              <div className="flex justify-start items-center py-3 px-3">
                <ButtonGroupCor
                  setAnalysisType={setAnalysisType}
                  analysisType={analysisType}
                  chartType = {chartType}
                />
              </div>

              <h4 className="text-lg font-bold pl-5 pt-2">Variable (s)</h4>
              <Divider borColor="border-black"/>
              {analysisType === "Anomalías" ?
                <div className="grid grid-cols-2 pt-3 px-3">
                  <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
                </div>
                :
                <div className="grid grid-cols-2 pt-3 px-3">
                  <GraphForm text="Eje X" atributos={props.atributos} valueSelect={varX} handleSelect={handleVarXForm}/>
                  <GraphForm text="Eje Y" atributos={props.atributos} valueSelect={varY} handleSelect={handleVarYForm}/>
                  {chartType !== "burbuja" ?  
                    <GraphForm text="Valor Y" atributos={optionsValueY} valueSelect={valueY} handleSelect={handleValueYForm}/>
                    :
                    <></>
                  } 
                </div>
              }

              <h4 className="text-lg font-bold pl-5 pt-2">Rango de anomalía</h4>
              <Divider borColor="border-black"/>
              <div className="flex items-center justify-center pb-4">
                <RangeSlider 
                  min={-100}
                  max={100}
                  onChange={({ min, max }) => {
                    setMinValAnomalias(min)
                    setMaxValAnomalias(max)
                  }}
                />
              </div>

              <div className="flex justify-center py-2">
                <buton 
                  className=" font-medium rounded-full text-sm text-white px-24 py-2.5 text-center inline-flex items-center mr-2text-white bg-[#FF5C00] border-b-4 border-gray-300 hover:bg-[#D35124]"
                  onClick = {handleCreateChart}
                >
                  Agregar
                </buton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
