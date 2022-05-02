import { useEffect, useState } from "react";
import Tabla from "../tabla/Tabla";
import "./NuevoModeloScreen.css"
import axios from "axios";

import { useParams } from "react-router-dom";

export const NuevoModeloScreen = () => {

    const [dataCsv, setDataCsv] = useState();
    const params = useParams();

    useEffect(() => {
       getReporte();
    }, [])

    const getReporte = async() => {
        console.log(params.reporteId)
        const result = await axios.get(
            "http://localhost:4000/getReporteById", {params: {id: params.reporteId}}, 
        );
        console.log(result);
        setDataCsv(result["data"]["data"]);
    }
    

    return(
        <div className='main'>
            <div className="header-screen">
                <h1>SELECCIONAR PARÁMETROS</h1>
                <button className="btn btn-outline-primary aplicar-modelo">Aplicar Modelo</button>
            </div>
            <Tabla hasCheckboxes={true}/>
        </div>
    );
}