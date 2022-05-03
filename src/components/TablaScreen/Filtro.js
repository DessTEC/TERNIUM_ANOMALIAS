import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import "./Filtro.css"


export const Filtro = (props) => {
    const [dataModelo] = useOutletContext();

    const atributo = props.atributo;
    const setFilteredData = props.filterFunction;
    var valuesChecked = useRef([]);   

    function getUniqueData(value, index, self) {
        return self.indexOf(value) === index;
    }

    function aplicarFiltro(valores) {
        setFilteredData(prevData => 
            prevData.filter((value,index) => {return valores.current.includes(value[atributo])})
        )
        props.filterAppliedFunction();
    }

    var column = dataModelo.map((value,index) => {return value[atributo]});
    column = column.filter(getUniqueData);

    const [checkedState, setCheckedState] = useState(
        new Array(column.length).fill(false)
    );

    function handleCheckboxChange(position, value) {
        const updatedCheckedState = checkedState.map((item, index) =>
        index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);

        if (updatedCheckedState[position]) {
            valuesChecked.current.push(value);
        } 
        else {
            valuesChecked.current.splice(valuesChecked.current.indexOf(value),1);
        }
    }
    
    return(
        <div className="filterBox">
            <ul>
                {column.map((value, index) =>
                                <li>
                                    <input type="checkbox" checked={checkedState[index]} onChange={() => {handleCheckboxChange(index, value)}}/>
                                    {value}
                                </li>
                        )}
            </ul>

            <button className="btn btn-primary aplicar-filtro" onClick={() => aplicarFiltro(valuesChecked)}>Aplicar</button>

        </div>
    );
}