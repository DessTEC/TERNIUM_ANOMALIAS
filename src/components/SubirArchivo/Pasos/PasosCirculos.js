import "../SubirDatos.css"

const PasosCirculos = (props) => {
    let textColor = props.textColor
    let backgroundNaranja = props.backgroundColor
    let clases = "shadow p-3 mb-5 bg-white rounded rounded-circle circle " + backgroundNaranja
    return (
            <div className={clases}>
            <h1 style={{color:textColor}}>{props.number}</h1>
            </div> 
    )
}

export default PasosCirculos