

const BotonesInferior = (props) =>{
    return(
        <div className="container">
                <button className="btn btn-outline-danger botonInline">{props.primerBoton}</button>
                <button className="btn btn-danger botonInline">{props.primerBoton}</button>
        </div>
    )
}

export default BotonesInferior