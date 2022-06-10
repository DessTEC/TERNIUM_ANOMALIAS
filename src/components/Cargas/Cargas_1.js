
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import Divider from "../GraficasScreen/Divider";

import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Bars } from 'react-loading-icons'

import axios from "axios";

export const Cargas_1 = () => {

  const navigate = useNavigate();

  const [file, setFile, dataCsv, setDataCsv, columnas, setColumnas, actInt, setActInt, actExt, setActExt, stepActual, setStepActual, fecha, setFecha] = useOutletContext();

  const [reporteId, setReporteId] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleClick = async() => {
    if(inputValue === ""){
      setShowModal(true);
    }else{
      setLoading(true);
      const formData = new FormData();
      formData.append("csv", file);
      formData.append("detalles", JSON.stringify({
        "name": inputValue,
        "actoresInternos": actInt,
        "actoresExternos": actExt,
        "fecha": fecha
      }))

      const result = await axios.post("http://localhost:4000/uploadFile", formData, {
          headers: {
            "Content-Type": 'multipart/form-data',
          },
      });

      setReporteId(result["data"]["id"]);
    }
  };

  useEffect(() => {
    if(reporteId !== undefined){
      setLoading(false);
      navigate(`/dashboard/consultar/${reporteId}/nuevoModelo`);
    }
  }, [reporteId])
  

  const handleCambio = () => {
    const colOriginal = [...columnas,...actInt, ...actExt]
    setColumnas(colOriginal);
    setActExt([]);
    setActInt([]);
    setStepActual(2);
    setFecha([])
    navigate('/dashboard/subir/parametros');
  }

  const [inputValue, setInputValue] = useState('')

  //Así se maneja el input para que sea modificable
  const handleInputChange = (e) => {
      setInputValue(e.target.value);
  }

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <div>
      <div className="">
        <h2 className="text-center">CARGAR DATOS</h2>
        <p className="text-center">Confirmar la configuración del reporte</p>
      </div>

      <div className="grid grid-rows-1 grid-cols-2 items-center px-36 my-4">
        <div className="flex flex-col bg-[#E9EEFF] rounded-lg">
          <div className="flex flex-row justify-center">
            <div className="bg-white rounded-lg w-5/6 mt-8">
              <p className="text-gray-400 pl-12 pt-3">Archivo a cargar</p>
              <Divider borColor="border-slate-400" />
              <p className="font-semibold pl-12 pt-2 pb-3">{file.name}</p>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <div className="bg-white rounded-lg w-5/6 mt-8">
              <p className="text-gray-400 pl-12 pt-3">Fecha de referencia</p>
              <Divider borColor="border-slate-400" />
              <p className="font-semibold pl-12 pt-2 pb-3">{fecha.length === 0 ? "No se eligió una fecha": fecha}</p>
            </div>
          </div>

          <div className="flex flex-row justify-center">
            <div className="bg-white rounded-lg w-5/6 mt-8">
              <p className="text-gray-400 pl-12 pt-3">Parametros de analisis</p>
              <Divider borColor="border-slate-400" />
              <div className="grid grid-row-2 grid-cols-2 items-start pl-10 pt-2">
                <p className="text-gray-400 py-2">Actores internos</p>
                <p className="text-gray-400 py-2">Actores externos</p>
              </div>
              <div className="grid grid-row-1 grid-cols-2 overflow-auto items-start h-48 pl-10 pb-3">
                <div className="mr-4">
                  {actInt.map((actor) => {
                    return <p className="font-semibold py-2 truncate">{actor}</p>;
                  })}
                </div>
                <div>
                  {actExt.map((actor) => {
                    return <p className="font-semibold py-2 truncate">{actor}</p>;
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
              value={ inputValue }
              onChange= {handleInputChange}
            ></input>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            className="flex flex-col items-center justify-center w-96 h-96 bg-[#F25C29] shadow-xl rounded-full text-sm font-medium text-white hover:bg-[#D35124]" 
            onClick={handleClick}
          >
            <div>
              <FontAwesomeIcon
                icon={faMagnifyingGlassChart}
                className="w-52 h-52 mr-2 ml-1"
              />
              <p className="font-bold text-4xl">Cargar</p>
            </div>
          </button>
        </div>
      </div>
      <div className="container">
          <button className="btn btn-outline-danger botonInline" onClick={handleCambio}>Cambiar relaciones</button>
      </div>
      <div className={!loading ? 'hidden' : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#1D2533]/30"}>
          <div className="relative mx-auto w-1/3 mt-72">
              <div className="relative bg-white rounded-lg shadow h-64">
                  <div className="flex flex-col items-center w-full">
                      <div className="mt-8">
                          <Bars stroke="#ffffff" fill="#1D2533"/>
                      </div>
                      <div className="mt-2">
                          <h2>Cargando</h2>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div className={!showModal ? 'hidden' : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#1D2533]/30"}>
                <div className="relative p-4 w-1/3 max-w-7xl h-full mx-auto mt-64">
                    <div className="relative bg-white rounded-lg shadow h-64">
                        <div className="flex flex-col center p-3 rounded-t w-full">
                            <div className="flex flex-row justify-end">
                                <button onClick={handleClose} className="bg-slate-50 hover:bg-slate-300 rounded-lg p-1.5 ml-auto inline-flex items-center text-gray-400 hover:text-gray-900">
                                    <FontAwesomeIcon icon={faXmark} className='w-5' />
                                </button>
                            </div>
                            <FontAwesomeIcon icon={faCircleExclamation} className='w-full h-1/3 text-[#F6A000]'/>
                            <h3 className="text-center mt-4">
                                Por favor escribe un nombre para el reporte
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};
