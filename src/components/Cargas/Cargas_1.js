import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import Divider from "../GraficasScreen/Divider";

export const Cargas_1 = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const nombreArchivo = "Reporte de plantas Enero-Febrero.xls";
  const actoresInternos = [
    "Planta Portería 1",
    "Planta Portería 2",
    "Planta Portería 3",
    "Planta Portería 4",
  ];
  const actoresExternos = [
    "Planta Portería 1",
    "Planta Portería 2",
    "Planta Portería 3",
    "Planta Portería 4",
  ];

  const handleClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  return (
    <div>
      <div className="">
        <h2 className="text-center">CARGAR DATOS</h2>
        <p className="text-center">Confirmar la configuración del archivo</p>
      </div>

      <div className="grid grid-rows-1 grid-cols-2 items-center px-36 my-4">
        <div className="flex flex-col bg-[#E9EEFF] rounded-lg">
          <div className="flex flex-row justify-center">
            <div className="bg-white rounded-lg w-5/6 mt-8">
              <p className="text-gray-400 pl-12 pt-3">Archivo a cargar</p>
              <Divider borColor="border-slate-400" />
              <p className="font-semibold pl-12 pt-2 pb-3">{nombreArchivo}</p>
            </div>
          </div>

          <div className="flex flex-row justify-center">
            <div className="bg-white rounded-lg w-5/6 mt-8">
              <p className="text-gray-400 pl-12 pt-3">Parametros de analisis</p>
              <Divider borColor="border-slate-400" />
              <div className="grid grid-row-2 grid-cols-2 items-start pl-12 pt-2">
                <p className="text-gray-400 py-2">Actores internos</p>
                <p className="text-gray-400 py-2">Actores externos</p>
              </div>
              <div className="grid grid-row-1 grid-cols-2 overflow-auto items-start h-48 pl-12 pb-3">
                <div>
                  {actoresInternos.map((actor) => {
                    return <p className="font-semibold py-2">{actor}</p>;
                  })}
                </div>
                <div>
                  {actoresExternos.map((actor) => {
                    return <p className="font-semibold py-2">{actor}</p>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center py-8">
            <p className="font-semibold pr-8">Nombre del Reporte:</p>
            <input
              className="rounded-lg w-2/6 py-1 px-3 text-center outline-0"
              placeholder="Reporte 1"
            ></input>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="flex flex-col items-center justify-center w-96 h-96 bg-[#F25C29] shadow-xl rounded-full text-sm font-medium text-white hover:bg-[#D35124]" onClick={handleClick}>
            {isButtonClicked === false ?
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlassChart}
                className="w-52 h-52 mr-2 ml-1"
              />
              <p className="font-bold text-4xl">Cargar</p>
            </div>
            :
            <div>
              <FontAwesomeIcon
                icon={faClipboardCheck}
                className="w-52 h-52 mr-2 ml-1"
              />
              <p className="font-bold text-4xl mt-4">Completado</p>
            </div>
            }
          </button>
        </div>
      </div>
    </div>
  );
};
