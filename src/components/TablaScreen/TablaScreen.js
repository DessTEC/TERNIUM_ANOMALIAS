import "./TablaScreen.css"
import Tabla from "../tabla/Tabla";
import "../SubirArchivo/SubirDatos.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { data } from "autoprefixer";

export const TablaScreen = () => {

    const [dataModelo, atributos, nombreModelo] = useOutletContext();
    const [filteredData, setFilteredData] = useState(dataModelo);
    const [emptiedFilters, setEmptiedFilters] = useState(true);
    const [csvFileName, setCsvFileName] = useState(undefined);

    function eliminarFiltros() {
        setFilteredData(dataModelo);
        setEmptiedFilters(true);
        console.log(dataModelo);
    }

    let atributosConAnom = [...atributos, "fecha", "anomaly", "scores"];

    const getCsvFileName = () => {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        const CsvFileName = nombreModelo === "" ? "unnamed_" + dateTime : nombreModelo + "_" + dateTime;
        setCsvFileName(CsvFileName);
        console.log(CsvFileName);
    }

    return(
        <div>
            <div className="container-buttons">
                <button className="btn btn-secondary eliminar-filtros-button" onClick={eliminarFiltros}>
                    <FontAwesomeIcon icon={faXmark} className="buttonIcon"/>
                    Eliminar Filtros
                </button>
                <h1>{nombreModelo}</h1>
                <CSVLink className="btn btn-outline-danger botonInline" data={filteredData} filename={csvFileName} asyncOnClick={true} onClick={getCsvFileName} >
                    <FontAwesomeIcon icon={faFileArrowDown} className="buttonIcon"/>
                    Descargar
                </CSVLink>
            </div>

            <Tabla hasCheckboxes={false} setSelectedVars={() => {}} filteredData={filteredData} data={dataModelo} setFilteredData={setFilteredData} atributos={atributosConAnom} emptiedFilters={emptiedFilters} setEmptiedFilters={setEmptiedFilters}/>
        </div>
    );
}
