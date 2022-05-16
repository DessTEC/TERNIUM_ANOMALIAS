import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";


import "./Tabla.css"
import { Filtro } from "../TablaScreen/Filtro";
import { FiltroAnomalias } from "../TablaScreen/FiltroAnomalias";

const Tabla = (props) => {

    const hasCheckboxes = props.hasCheckboxes;
    const filteredData = props.filteredData;
    const setFilteredData = props.setFilteredData;


    const atributos = props.atributos;

    useEffect(() => {
        console.log(filteredData);
      return;
    }, [filteredData])

    return(
        <div className="table-container">
            <table className="table">
            <thead className="table-responsive">
                {atributos.map((header,index) =>
                    <Header hasCheckboxes={hasCheckboxes} header={header} index={index} filteredData={filteredData} filterFunction={setFilteredData} setSelectedVars={props.setSelectedVars} emptiedFilters={props.emptiedFilters} setEmptiedFilters={props.setEmptiedFilters}/>
                )}
            </thead>
            <tbody>
                {filteredData.map(row => <Row row = {row} headers={atributos}/>)}
            </tbody>
            </table>
        </div>
    );
}

const Header = (props) => {
    const hasCheckboxes = props.hasCheckboxes;
    const header = props.header;
    const index = props.index;
    const isHeaderAnomalies = header === "scores";

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        if(isChecked){
            props.setSelectedVars(prevVars => [...prevVars, header]);
        }else{
            props.setSelectedVars(prevVars => prevVars.filter( (dataHeader) => {
                return dataHeader !== header;
            }));
        }
    }, [isChecked]);

    useEffect(() => {
        if(props.emptiedFilters) {
            setIsFilterApplied(false);
            setIsOpenFilter(false);
        }
    }, [props.emptiedFilters])

    function toggleFilter(){
        setIsOpenFilter(isOpenFilter => !isOpenFilter);
    }

    function filterApplied(){
        toggleFilter();
        setIsFilterApplied(true);
        props.setEmptiedFilters(false);
    }

    return(
        <th>
            <div className="header">
                <p>{header}</p>
                {hasCheckboxes ? <input type="checkbox" onClick={handleCheck}/> : <></>}
                <FontAwesomeIcon icon={faFilter} className={isFilterApplied ? "filterIcon filterApplied" : "filterIcon"} onClick={toggleFilter}/>
                {isOpenFilter && !isFilterApplied && isHeaderAnomalies && <FiltroAnomalias atributo={header} filteredData={props.filteredData} filterFunction={props.filterFunction} filterAppliedFunction={filterApplied}/>}
                {isOpenFilter && !isFilterApplied && !isHeaderAnomalies && <Filtro atributo={header} filteredData={props.filteredData} filterFunction={props.filterFunction} filterAppliedFunction={filterApplied}/>}
            </div>
        </th>
    );
    
}

const Row = (props) => {
    var row = props.row;
    var headers = props.headers;
    
    return(
        <tr> {headers.map(cell => <td>{row[cell]}</td>)} </tr>
    );
}

export default Tabla;
