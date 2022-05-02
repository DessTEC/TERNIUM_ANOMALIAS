import React, { useState, useEffect } from "react";
import { Atributos } from "../../data/Data";
import { Data } from "../../data/Data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import "./Tabla.css"
import { Filtro } from "../TablaScreen/Filtro";

const Tabla = (props) => {

    const hasCheckboxes = props.hasCheckboxes;
    const [filteredData, setFilteredData] = useState(Data);

    // useEffect(() => {
    //     console.log(filteredData);
    //   return;
    // }, [filteredData])

    return(
        <div class="table-responsive">
            <table class="table">
            <thead>
                {Atributos.map((header,index) =>
                            <Header hasCheckboxes={hasCheckboxes} data={header} index={index} filterFunction={setFilteredData}/>
                    )}
            </thead>
            <tbody>
                {filteredData.map(row => <Row row = {row}/>)}
            </tbody>
            </table>
        </div>
    );
}

const Header = (props) => {
    const hasCheckboxes = props.hasCheckboxes;
    const data = props.data;
    const index = props.index;

    const [isOpenFilter, setIsOpenFilter] = React.useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    function toggleFilter(){
        setIsOpenFilter(isOpenFilter => !isOpenFilter);
    }

    function filterApplied(){
        toggleFilter();
        setIsFilterApplied(true);
    }

    return(
        <th>
            <div className="header">
                <p>{data}</p>
                {hasCheckboxes ? <input type="checkbox"/> : <></>}
                <FontAwesomeIcon icon={faFilter} className={isFilterApplied ? "filterIcon filterApplied" : "filterIcon"} onClick={toggleFilter}/>
                {isOpenFilter && <Filtro atributo={index} filterFunction={props.filterFunction} filterAppliedFunction={filterApplied}/>}
            </div>
        </th>
    );
    
}

const Row = (props) => {
    var row = props.row;
    return(
        <tr> {row.map(cell => <td>{cell}</td>)} </tr>
    );
}

export default Tabla;
