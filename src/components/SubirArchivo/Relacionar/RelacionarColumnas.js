import BloqueAtributo from "./BloqueAtributo"
import BloqueSubido from "./BloqueSubido"
import Steps from "../Pasos/Steps"
import "./Relacionar.css"
import ContenedorRelacionar from "./ContenedorRelacionar"
import BotonesInferior from "../CargarArchivo/BotonesInferior"

import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const RelacionarColumnas = () =>{

    const navigate = useNavigate()

    const [file, setFile, dataCsv, setDataCsv, columnas, setColumnas, actInt, setActInt, actExt, setActExt] = useOutletContext();

    const handlePrimero = () => {
        navigate('/dashboard/subir');
    }

    const handleSegundo = () => {
        navigate('/dashboard/subir/cargar');
    }
    return(
        <div>
            <h2 className="text">RELACIONAR COLUMNAS</h2>
            <h3 className="text">Seleccione la columna a utilizar para cada uno de los parámetros del modelo</h3>
            <ContenedorRelacionar columnas = {columnas}/>
            <BotonesInferior primerBoton="Cambiar archivo" segundoBoton="Aplicar modelo" handlePrimero = {handlePrimero} handleSegundo={handleSegundo}/>
        </div>
    )
}

export default RelacionarColumnas