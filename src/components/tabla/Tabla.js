import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import "./Tabla.css"
import { Filtro } from "../TablaScreen/Filtro";

const Tabla = (props) => {

    const hasCheckboxes = props.hasCheckboxes;
    const [filteredData, setFilteredData] = useState(props.data);


    const atributos = props.atributos;

    // useEffect(() => {
    //     console.log(filteredData);
    //   return;
    // }, [filteredData])

    return(
        <div class="table-responsive">
            <table class="table">
            <thead>
                {atributos.map((header,index) =>
                    <Header hasCheckboxes={hasCheckboxes} data={header} index={index} filterFunction={setFilteredData} setSelectedVars={props.setSelectedVars}/>
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
    const data = props.data;
    const index = props.index;

    const [isOpenFilter, setIsOpenFilter] = React.useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        if(isChecked){
            props.setSelectedVars(prevVars => [...prevVars, data]);
        }else{
            props.setSelectedVars(prevVars => prevVars.filter( (dataHeader) => {
                return dataHeader !== data;
            }));
        }
    }, [isChecked]);

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
                {hasCheckboxes ? <input type="checkbox" onClick={handleCheck}/> : <></>}
                <FontAwesomeIcon icon={faFilter} className={isFilterApplied ? "filterIcon filterApplied" : "filterIcon"} onClick={toggleFilter}/>
                {isOpenFilter && <Filtro atributo={index} filterFunction={props.filterFunction} filterAppliedFunction={filterApplied}/>}
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
