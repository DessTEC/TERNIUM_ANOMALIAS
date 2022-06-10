import { Link } from "react-router-dom"


const BotonesInferior = (props) =>{

    return(
        <div className="container">
            <button className="btn btn-outline-danger botonInline" onClick={props.handlePrimero}>{props.primerBoton}</button>
            <button id="configurar" className="btn btn-danger botonInline" onClick={props.handleSegundo}>{props.segundoBoton}</button>
        </div>
    )
}

export default BotonesInferior