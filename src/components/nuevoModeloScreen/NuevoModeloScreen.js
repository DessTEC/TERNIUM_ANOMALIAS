import { useEffect, useState } from "react";
import Tabla from "../tabla/Tabla";
import "./NuevoModeloScreen.css"
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";


export const NuevoModeloScreen = () => {

    const navigate = useNavigate();

    const [dataCsv, setDataCsv] = useState();
    const [atributos, setAtributos] = useState(undefined);
    const params = useParams();
    const [selectedVars, setSelectedVars] = useState([]);

    const [reporteId, setReporteId] = useState(params.reporteId);
    const [modeloId, setModeloId] = useState(undefined);

    useEffect(() => {
       getReporte();
    }, [])

    const getReporte = async() => {
        const result = await axios.get(
            "http://localhost:4000/getReporteById", {params: {id: reporteId}}, 
        );
        setDataCsv(result["data"]["data"]);
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
    

    return(
        <div className='main'>
            <div className="header-screen">
                <h1>SELECCIONAR PARÁMETROS</h1>
                <button className="btn btn-outline-primary aplicar-modelo" onClick={createModelo}>Aplicar Modelo</button>
            </div>
            {
                atributos === undefined ? <></> :
                <>
                    <Tabla hasCheckboxes={true} setSelectedVars={setSelectedVars} data={dataCsv} atributos={atributos}/>
                    <input
                    className="rounded-lg w-2/6 py-1 px-3 text-center border-solid border-2"
                    placeholder="Modelo 1"
                    value={ inputValue }
                    onChange= {handleInputChange}
                    ></input>
                </>     
            }
        </div>
    );
}