import { useEffect, useRef, useState } from "react";
import GraphButton from "./GraphButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import barchart1 from "../../assets/bar-chart1.png";
import barchart2 from "../../assets/bar-chart3.png";
import chart1 from "../../assets/chart1.png";
import Divider from "./Divider"
import CorButton from "./CorButton";
import GraphForm from "./GraphForm";
import RangeSlider from "./RangeSlider";

export default function AddGraph(props) {
  const ref = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

              <h2 className="text-lg font-bold pl-5">Tipo de gráfica</h2>
              <Divider/>
              <div className="flex justify-center py-3 px-3">
                <GraphButton
                  graphImg={barchart1}
                  alt="barchart1"
                  graphTxt="Columnas verticales"
                />
                <GraphButton
                  graphImg={barchart2}
                  alt="barchart2"
                  graphTxt="Columnas horizontales"
                />
                <GraphButton
                  graphImg={chart1}
                  alt="barchart2"
                  graphTxt="Burbuja"
                />
              </div>

              <h2 className="text-lg font-bold pl-5">Comparativa</h2>
              <Divider/>
              <div className="flex justify-start items-center py-3 px-3">
                <CorButton text="Anomalías"/>
                <CorButton text="Correlación"/>
              </div>

              <h2 className="text-lg font-bold pl-5">Variable (s)</h2>
              <Divider/>
              <div className="pt-3 px-3">
                <GraphForm text="Eje X"/>
                <GraphForm text="Eje Y"/>
              </div>

              <h2 className="text-lg font-bold pl-5">Rango de anomalía</h2>
              <Divider/>
              <div className="flex items-center justify-center">
                <RangeSlider
                  initialMin={-0.5}
                  initialMax={0.5}
                  min={-1}
                  max={1}
                  step={0.1}
                  cap={1}
                />
              </div>
              
              <div className="flex justify-center py-2">
                <buton className=" font-medium rounded-full text-sm text-white px-24 py-2.5 text-center inline-flex items-center mr-2text-white bg-[#FF5C00] border-b-4 border-gray-300 hover:bg-[#D35124]">Agregar</buton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
