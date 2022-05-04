import "./TablaScreen.css"
import Tabla from "../tabla/Tabla";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import { data } from "autoprefixer";

export const TablaScreen = () => {

    const [dataModelo, atributos] = useOutletContext();
    const [filteredData, setFilteredData] = useState(dataModelo);
    const [emptiedFilters, setEmptiedFilters] = useState(true);

    function eliminarFiltros() {
        setFilteredData(dataModelo);
        setEmptiedFilters(true);
        console.log(dataModelo);
    }

    let atributosConAnom = [...atributos, "anomaly", "scores"];

    return(
        <div>
            <div className="container-buttons">
                <button className="btn btn-secondary eliminar-filtros-button" onClick={eliminarFiltros}>
                    <FontAwesomeIcon icon={faXmark} className="buttonIcon"/>
                    Eliminar Filtros
                </button>
                <button className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faFileArrowDown} className="buttonIcon"/>
                    Descargar
                </button>
            </div>

            <Tabla hasCheckboxes={false} setSelectedVars={() => {}} filteredData={filteredData} data={dataModelo} setFilteredData={setFilteredData} atributos={atributosConAnom} emptiedFilters={emptiedFilters} setEmptiedFilters={setEmptiedFilters}/>
        </div>
    );
}
