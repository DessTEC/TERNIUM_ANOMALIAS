import BloqueAtributo from "./BloqueAtributo"
import BloqueSubido from "./BloqueSubido"
import Steps from "../Pasos/Steps"
import "./Relacionar.css"
import ContenedorRelacionar from "./ContenedorRelacionar"
import BotonesInferior from "../CargarArchivo/BotonesInferior"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

const RelacionarColumnas = () =>{

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const [file, setFile, dataCsv, setDataCsv, columnas, setColumnas, actInt, setActInt, actExt, setActExt, stepActual, setStepActual] = useOutletContext();

    const handlePrimero = () => {
        setColumnas(undefined);
        setActInt([]);
        setActExt([]);
        setStepActual(1);
        navigate('/dashboard/subir');
    }

    const handleSegundo = () => {
        if(actInt.length === 0 || actExt.length === 0){
            console.log(actInt)
            console.log(actExt)
            console.log(columnas)

            setShowModal(true);
        }else{
            setStepActual(3);
            console.log(columnas)
            navigate('/dashboard/subir/cargar');
        }
        
    }

    const handleClose = () => {
        setShowModal(false);
    }

    return(
        <div>
            <h2 className="text">RELACIONAR COLUMNAS</h2>
            <h3 className="text">Seleccione la columna a utilizar para cada uno de los parámetros del modelo</h3>
            <ContenedorRelacionar/>
            <BotonesInferior primerBoton="Cambiar archivo" segundoBoton="Cargar datos" handlePrimero = {handlePrimero} handleSegundo={handleSegundo}/>

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
                                Por favor relaciona un actor externo y uno interno
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelacionarColumnas