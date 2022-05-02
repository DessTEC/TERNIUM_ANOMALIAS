import "../SubirDatos.css"
import { useOutletContext } from "react-router-dom";

const PasosCirculos = (props) => {
    

    let textColor = props.stepActual === props.number ? "white" : "black"
    let backgroundNaranja = props.stepActual === props.number ? "backgroundNaranja" : ""
    let clases = "shadow p-3 mb-5 bg-white rounded rounded-circle circle " + backgroundNaranja
    return (
            <div className={clases}>
            <h1 style={{color:textColor}}>{props.number}</h1>
            </div> 
    )
}

export default PasosCirculos