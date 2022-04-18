

const BloqueAtributo = (props) =>{

    let classes = "rounded containerRelacionar " + props.color
    
    return(
        <div className={classes}>
            <p className="tituloAtributo">{props.titulo}</p>
            <div className="container">
                <div className="rounded containerDotted"></div>
            </div>
        </div>
    )
}

export default BloqueAtributo