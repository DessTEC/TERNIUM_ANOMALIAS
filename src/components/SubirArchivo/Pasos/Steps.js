import PasosCirculos from "./PasosCirculos"
import LineaPunteada from "./LineaPunteada"
import StepText from "./StepsText"

const Steps = () =>{
    return(
            <div class="d-flex justify-content-between containerDatos">
                <PasosCirculos number={1} textColor="white" backgroundColor="backgroundNaranja"/>
                <StepText text={"Sube un archivo"}/>
                <LineaPunteada/>
                <PasosCirculos number={2} textColor="black" backgroundColor={false}/>
                <StepText text={"Configura los parámetros"}/>
                <LineaPunteada/>
                <PasosCirculos number={3} textColor="black" backgroundColor={false}/>
                <StepText text={"Cargar Datos"}/>
            </div>
    )
}

export default Steps