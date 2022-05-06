import React, { useState, useRef, useEffect } from "react";
import "./Filtro.css"


export const FiltroAnomalias = (props) => {
    const setFilteredData = props.filterFunction;

    function aplicarFiltro(valores) {
        setFilteredData(prevData =>
            prevData.filter((value, index) => { return value["scores"] >= minValue && value["scores"] <= maxValue })
        )
        props.filterAppliedFunction();
    }

    const [minValue, setMinValue] = useState(-1)
    const [maxValue, setMaxValue] = useState(1)

    function handleChangeMin(event) {
        const newMinValue = parseFloat(event.target.value)
        if (newMinValue >= -1 && newMinValue <= 1 && newMinValue < maxValue) {
            setMinValue(newMinValue)    
        }
    }

    function handleChangeMax(event) {
        const newMaxValue = parseFloat(event.target.value)
        if (newMaxValue >= -1 && newMaxValue <= 1 && newMaxValue > minValue) {
            setMaxValue(newMaxValue)    
        }
    }

    return (
        <div className="filterBox">
            <ul>
                    <li>
                        Mínimo:
                        <input 
                            type="number" 
                            className="number-box" 
                            step={0.1}
                            value={minValue}
                            onChange={handleChangeMin}
                        />
                    </li>
                    <li>
                        Máximo:
                        <input 
                            type="number" 
                            className="number-box" 
                            step={0.1}
                            value={maxValue}
                            onChange={handleChangeMax}
                        />
                    </li>
            </ul>

            <button className="btn btn-primary aplicar-filtro" onClick={aplicarFiltro}>Aplicar</button>

        </div>
    );
}