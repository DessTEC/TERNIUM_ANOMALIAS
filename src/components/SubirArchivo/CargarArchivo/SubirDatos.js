import Steps from "../Pasos/Steps"
import ContenedorArchivos from "./ContenedorArchivos"
import BotonesInferior from "./BotonesInferior"
import "../SubirDatos.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


import { useState, useEffect } from 'react';
import axios from "axios";

import { useOutletContext, useNavigate } from "react-router-dom";
import { Bars } from 'react-loading-icons'


const SubirDatos = () =>{
    const [file, setFile, dataCsv, setDataCsv, columnas, setColumnas, actInt, setActInt, actExt, setActExt, stepActual, setStepActual] = useOutletContext();

    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [modalError, setModalError] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePrimero = () => {
        navigate('/');
    }

    const handleSegundo = async (e) => {
        if(file === undefined || !file.type.includes("csv")){
            setModalError("El formato del archivo no es válido");
            setShowModal(true);
        }else{
            setLoading(true);
            const formData = new FormData();
            formData.append("csv", file);
            const result = await axios.post("http://localhost:4000/readFile", formData, {
                headers: {
                  "Content-Type": 'multipart/form-data',
                },
            });

            setColumnas(result["data"]["columnas"]);
            
        }
    }

    useEffect(() => {
        if(columnas !== undefined){
            if(columnas.length === 0){
                setModalError("El archivo debe tener al menos dos columnas y dos filas");
                setLoading(false);
                setShowModal(true);
            }else{
                setLoading(false);
                setStepActual(2);
                navigate('/dashboard/subir/parametros');
            }
        } 
    }, [columnas])


    
    const handleClose = () => {
        setShowModal(false);
    }


    return (
        <div>
            <h2 className="text">SUBIR ARCHIVO</h2>
            <h3 className="text">Sube el archivo que deseas analizar</h3>
            <ContenedorArchivos file={file} setFile={setFile} id="contenedorArchivos"/>
            <BotonesInferior primerBoton="Cancelar" segundoBoton="Configurar parametros" handlePrimero = {handlePrimero} handleSegundo = {handleSegundo}/>

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

            <div id="modal" className={!showModal ? 'hidden' : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#1D2533]/30"}>
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
                                Por favor sube un archivo válido
                            </h3>
                            <h5 className="text-center mt-4">
                                {modalError}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubirDatos