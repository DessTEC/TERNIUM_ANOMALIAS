import PasosCirculos from "./PasosCirculos"
import LineaPunteada from "./LineaPunteada"
import StepText from "./StepsText"
import { Outlet } from "react-router-dom"

const Steps = () =>{
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

                <Outlet/>
            </div>
    )
}

export default Steps