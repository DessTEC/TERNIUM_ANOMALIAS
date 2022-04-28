

const BloqueSubido = (props) =>{
    const espacio = "rounded border border-secondary shadow p-3 mb-5 bg-white rounded text" + props.espacio;
    return(
        <div>
                <div className={espacio}><p>{props.nombreAtributo}</p></div>
        </div>
    )
}

export default BloqueSubido