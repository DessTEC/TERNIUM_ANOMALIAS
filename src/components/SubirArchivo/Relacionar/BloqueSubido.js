

const BloqueSubido = (props) =>{
    const espacio = "rounded border border-secondary shadow p-3 mb-5 bg-white rounded text d-flex justify-content-center" + props.espacio;
    return(
                <div className={espacio}><p>{props.nombreAtributo}</p></div>
    )
}

export default BloqueSubido