import PasosCirculos from "./PasosCirculos"
import LineaPunteada from "./LineaPunteada"
import StepText from "./StepsText"
import { Outlet } from "react-router-dom"

import { useState } from 'react';

const Steps = () =>{

    const [file, setFile] = useState();
    const [dataCsv, setDataCsv] = useState([]);
    const [columnas, setColumnas] = useState([]);
    const [actInt, setActInt] = useState([]);
    const [actExt, setActExt] = useState([]);

    return(
            <div>
                <div className="d-flex justify-content-between containerDatos">
                    <PasosCirculos number={1} textColor="white" backgroundColor="backgroundNaranja"/>
                    <StepText text={"Sube un archivo"}/>
                    <LineaPunteada/>
                    <PasosCirculos number={2} textColor="black" backgroundColor={false}/>
                    <StepText text={"Configura los parámetros"}/>
                    <LineaPunteada/>
                    <PasosCirculos number={3} textColor="black" backgroundColor={false}/>
                    <StepText text={"Cargar Datos"}/>
                </div>

                <Outlet context={[file, setFile, dataCsv, setDataCsv, columnas, setColumnas, actInt, setActInt, actExt, setActExt]}/>
            </div>
    )
}

export default Steps