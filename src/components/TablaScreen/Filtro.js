import React, { useState, useRef, useEffect } from "react";
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

    var checkedStateTemp = {};
    column.map((value) => checkedStateTemp[value] = false);
    const [checkedState, setCheckedState] = useState(
        // column.map((value) => ({[value]: false}))
        checkedStateTemp
    );

    function handleCheckboxChange(value) {
        var updatedCheckedState = {...checkedState};
        updatedCheckedState[value] = !updatedCheckedState[value];
        setCheckedState(updatedCheckedState);

        if (updatedCheckedState[value]) {
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

    useEffect(() => {
        console.log(checkedState);
      return;
    }, [checkedState])

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
            <ul className="column-values">
                {column.filter(value => value.toString().toLowerCase().includes(wordEntered.toLowerCase())).map((value) =>
                    <li>
                        <input type="checkbox" checked={checkedState[value]} onChange={() => { handleCheckboxChange(value) }} />
                        {value}
                    </li>
                )}
            </ul>

            <button className="btn btn-primary aplicar-filtro" onClick={() => aplicarFiltro(valuesChecked)}>Aplicar</button>

        </div>
    );
}