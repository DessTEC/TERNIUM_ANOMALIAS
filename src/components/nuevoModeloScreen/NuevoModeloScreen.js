import { useEffect, useState, useRef } from "react";
import Tabla from "../tabla/Tabla";
import "./NuevoModeloScreen.css"
import "../SubirArchivo/SubirDatos.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';


import { useParams, useNavigate } from "react-router-dom";
import { Bars } from 'react-loading-icons'


export const NuevoModeloScreen = () => {

    const navigate = useNavigate();

    const [dataCsv, setDataCsv] = useState();
    var resultRequest = useRef([]);
    const [atributos, setAtributos] = useState(undefined);
    const params = useParams();
    const [selectedVars, setSelectedVars] = useState([]);
    const [emptiedFilters, setEmptiedFilters] = useState(true);

    const [reporteId, setReporteId] = useState(params.reporteId);
    const [modeloId, setModeloId] = useState(undefined);


    const [showModal, setShowModal] = useState(false);
    const [modalError, setModalError] = useState("");
    const [errorTittle, setErrorTitle] = useState("");

    const [fechaRelModel, setFechaRelModel] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
       getReporte();
    }, [])

    const getReporte = async() => {
        const result = await axios.get(
            "http://localhost:4000/getReporteById", {params: {id: reporteId}}, 
        );
        resultRequest.current = result["data"]["data"];
        setDataCsv(resultRequest.current.map((item) => item));
        setAtributos([...result["data"]["actoresInternos"], ...result["data"]["actoresExternos"]]);
        if(result["data"]["fechaRelacion"].length > 0){
            setFechaRelModel(result["data"]["fechaRelacion"][0]);
        }
    }

    const [inputValue, setInputValue] = useState('')


    const createModelo = async() => {

        if(inputValue != "" && selectedVars.length >= 2){
            setLoading(true);
            const result = await axios.post(
                "http://localhost:4000/addModelo", {
                    reporteId: params.reporteId,
                    name: inputValue,
                    variables: atributos,
                    data: dataCsv,
                    selectedVars: selectedVars,
                    fechaRelacion: fechaRelModel
                }
            );
            setModeloId(result["data"]["id"]);
        }
        else{
            if(inputValue == "" && selectedVars.length < 2){
                setModalError("Modelo sin nombre y columnas no seleccionadas");
                setErrorTitle("Ingrese el nombre del modelo y seleccione dos columnas o más")
            }
            else if(selectedVars.length < 2){
                setModalError("No se han seleccionado columnas");
                setErrorTitle("Seleccione al menos 2 columnas para aplicar el modelo")
            }
            else if(inputValue == ""){
                setModalError("No se ha nombrado el nuevo modelo");
                setErrorTitle("Ingrese el nombre del modelo")
            }
            setShowModal(true);
        }
    }

    useEffect(() => {
        if(modeloId !== undefined){
            setLoading(false);
            navigate(`/dashboard/consultar/${reporteId}/${modeloId}`);
        }
      }, [modeloId])

    //Así se maneja el input para que sea modificable
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    function eliminarFiltros() {
        setDataCsv(resultRequest.current);
        setEmptiedFilters(true);
    }
    

    const handleClose = () => {
        setShowModal(false);
    }

    return(
        <div className='main'>
            <div className="header-screen">
                <button className="btn btn-secondary eliminar-filtros-button" onClick={eliminarFiltros}>
                    <FontAwesomeIcon icon={faXmark} className="buttonIcon"/>
                    Eliminar Filtros
                </button>
                <h1>NUEVO MODELO</h1>
                <button className="btn btn-outline-danger botonInline" onClick={createModelo}>Aplicar Modelo</button>
            </div>
            <div className="nombre-modelo-row">
            <h3 className="nombre-modelo">Nombre del modelo:</h3>
            <input
                className="rounded-lg w-2/6 py-1 px-3 text-center border-solid border-2"
                value={ inputValue }
                onChange= {handleInputChange}
            />
            </div>
            {
                atributos === undefined ? <></> :
                <>
                    <Tabla hasCheckboxes={true} setSelectedVars={setSelectedVars} filteredData={dataCsv} setFilteredData={setDataCsv} atributos={atributos} emptiedFilters={emptiedFilters} setEmptiedFilters={setEmptiedFilters}/>
                </>     
            }

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
                                {modalError}
                            </h3>
                            <h5 className="text-center mt-4">
                                {errorTittle}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}