import PasosCirculos from "./PasosCirculos"
import LineaPunteada from "./LineaPunteada"
import StepText from "./StepsText"
import { Outlet } from "react-router-dom"

import { useState } from 'react';

const Steps = () =>{

    const [file, setFile] = useState(undefined);
    const [dataCsv, setDataCsv] = useState(undefined);
    const [columnas, setColumnas] = useState(undefined);
    const [actInt, setActInt] = useState([]);
    const [actExt, setActExt] = useState([]);
    const [fecha, setFecha] = useState([]);

    const [stepActual, setStepActual] = useState(1);

    return(
            <div>
                <div className="d-flex justify-content-between containerDatos">
                    <PasosCirculos number={1} stepActual={stepActual}/>
                    <StepText text={"Sube un archivo"}/>
                    <LineaPunteada/>
                    <PasosCirculos number={2} stepActual={stepActual}/>
                    <StepText text={"Configura los parámetros"}/>
                    <LineaPunteada/>
                    <PasosCirculos number={3} stepActual={stepActual}/>
                    <StepText text={"Cargar Datos"}/>
                </div>

                <Outlet context={[file, setFile, dataCsv, setDataCsv, columnas, setColumnas, actInt, setActInt, actExt, setActExt, stepActual, setStepActual, fecha, setFecha]}/>
            </div>
    )
}

export default Steps