import { Link } from "react-router-dom"


const BotonesInferior = (props) =>{

    return(
        <div className="container">
                <Link to={props.linkPrimero}>
                    <button className="btn btn-outline-danger botonInline">{props.primerBoton}</button>
                </Link>
                <Link to={props.linkSegundo}>
                    <button className="btn btn-danger botonInline">{props.segundoBoton}</button>
                </Link>
        </div>
    )
}

export default BotonesInferior