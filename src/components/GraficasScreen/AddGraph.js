import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Divider from "./Divider";
import GraphForm from "./GraphForm";
import RangeSlider from "./RangeSlider";
import {ButtonGroupCharts} from "./ButtonGroupCharts";
import { ButtonGroupCor } from "./ButtonGroupCor";

import { UserData } from "../../data/Data";

export default function AddGraph(props) {
  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //Selección de gráficas

  //Variables de configuración
  const [chartType, setChartType] = useState("barrasV");
  const [analysisType, setAnalysisType] = useState('Anomalías');
  const [minValAnomalias, setMinValAnomalias] = useState(-100);
  const [maxValAnomalias, setMaxValAnomalias] = useState(100);

  const optionsCharts = {
    barrasV: {
      plugins: {
        title: {
          display: true,
          text: 'Anomalías 2019',
        },
      },
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
    barrasH: {
      plugins: {
        title: {
          display: true,
          text: 'Anomalías 2019',
        },
      },
      responsive: true,
      indexAxis: 'y',
      maintainAspectRatio: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
    burbuja: {
      plugins: {
        title: {
          display: true,
          text: 'Anomalías 2019',
        },
      },
      responsive: true,
      maintainAspectRatio: true,
    }
  }

  const handleClick = () => {
    setIsMenuOpen(true);
  };

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
    console.log(`Gráfica: ${chartType}, Tipo: ${analysisType}, Rango: ${minValAnomalias}-${maxValAnomalias}`)
    setIsMenuOpen(false);
    props.setCharts(prevCharts => [...prevCharts, {
      id: props.charts.length,
      type: chartType,
      data: {
        labels: UserData.map((data) => data.planta),
        datasets: [
          {
            label: "Relaciones Normales",
            data: UserData.map((data) => data.normales),
            backgroundColor: ["#FAAD42"],
          },
          {
            label: "Relaciones Anómalas",
            data: UserData.map((data) => data.anomalias),
            backgroundColor: ["#F25C29"],
          },
        ],
      },
      options: optionsCharts[chartType]
    }])
  }

  return (
    <div>
      <div class="relative inline-block text-left">
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
              <Divider />
              <div className="flex justify-center py-3 px-3">
                <ButtonGroupCharts
                  setChartType={setChartType}
                  chartType = {chartType}
                />
              </div>

              <h4 className="text-lg font-bold pl-5 pt-2">Comparativa</h4>
              <Divider />
              <div className="flex justify-start items-center py-3 px-3">
                <ButtonGroupCor
                  setAnalysisType={setAnalysisType}
                  analysisType={analysisType}
                />
              </div>

              <h4 className="text-lg font-bold pl-5 pt-2">Variable (s)</h4>
              <Divider />
              {analysisType === "Anomalías" ?
                <div className="grid grid-cols-2 pt-3 px-3">
                  <GraphForm text="Eje X" />
                </div>
                :
                <div className="grid grid-cols-2 pt-3 px-3">
                  <GraphForm text="Eje X" />
                  <GraphForm text="Valor" />
                  <GraphForm text="Eje Y" />
                </div>
              }

              <h4 className="text-lg font-bold pl-5 pt-2">Rango de anomalía</h4>
              <Divider />
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
