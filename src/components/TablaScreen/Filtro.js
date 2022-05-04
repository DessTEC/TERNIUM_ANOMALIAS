import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import "./Filtro.css"


export const Filtro = (props) => {
    const atributo = props.atributo;
    const setFilteredData = props.filterFunction;
    var valuesChecked = useRef([]);

    function getUniqueData(value, index, self) {
        return self.indexOf(value) === index;
    }

    function aplicarFiltro(valores) {
        setFilteredData(prevData =>
            prevData.filter((value, index) => { return valores.current.includes(value[atributo]) })
        )
        props.filterAppliedFunction();
    }

    var column = props.filteredData.map((value, index) => { return value[atributo] });
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
            valuesChecked.current.splice(valuesChecked.current.indexOf(value), 1);
        }
    }

    const [wordEntered, setWordEntered] = useState("");

    const handleSearch = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };

    return (
        <div className="filterBox">
            <form action="/" method="get" className='text-center pt-1'>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Buscar"
                    name="s"
                    className='bg-[#F2F2F2] rounded-xl pt-2 pb-2 pl-3 w-90 h-2/3'
                    value={wordEntered}
                    onChange={handleSearch}
                />
            </form>
            <ul>
                {column.filter(value => value.toString().toLowerCase().includes(wordEntered.toLowerCase())).map((value, index) =>
                    <li>
                        <input type="checkbox" checked={checkedState[index]} onChange={() => { handleCheckboxChange(index, value) }} />
                        {value}
                    </li>
                )}
            </ul>

            <button className="btn btn-primary aplicar-filtro" onClick={() => aplicarFiltro(valuesChecked)}>Aplicar</button>

        </div>
    );
}