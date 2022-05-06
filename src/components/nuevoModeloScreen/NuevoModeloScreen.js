import { useEffect, useState, useRef } from "react";
import Tabla from "../tabla/Tabla";
import "./NuevoModeloScreen.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useParams, useNavigate } from "react-router-dom";


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
    }

    const createModelo = async() => {
        const result = await axios.post(
            "http://localhost:4000/addModelo", {
                reporteId: params.reporteId,
                name: inputValue,
                variables: atributos,
                data: dataCsv,
                selectedVars: selectedVars
            }
        );
        setModeloId(result["data"]["id"]);
    }

    useEffect(() => {
        if(modeloId !== undefined){
            console.log("Ir a tabla de consulta");
            navigate(`/dashboard/consultar/${reporteId}/${modeloId}`);
        }
      }, [modeloId])
    

    const [inputValue, setInputValue] = useState('')

    //Así se maneja el input para que sea modificable
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    function eliminarFiltros() {
        setDataCsv(resultRequest.current);
        setEmptiedFilters(true);
    }
    

    return(
        <div className='main'>
            <div className="header-screen">
                <button className="btn btn-secondary eliminar-filtros-button" onClick={eliminarFiltros}>
                    <FontAwesomeIcon icon={faXmark} className="buttonIcon"/>
                    Eliminar Filtros
                </button>
                <h1>NUEVO MODELO</h1>
                <button className="btn btn-outline-primary aplicar-modelo" onClick={createModelo}>Aplicar Modelo</button>
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
        </div>
    );
}