import BloqueAtributo from "./BloqueAtributo"
import BloqueSubido from "./BloqueSubido"
import Steps from "../Pasos/Steps"
import "./Relacionar.css"
import ContenedorRelacionar from "./ContenedorRelacionar"
import BotonesInferior from "../CargarArchivo/BotonesInferior"


const RelacionarColumnas = () =>{
    return(
        <div>
            <h2 className="text">RELACIONAR COLUMNAS</h2>
            <h3 className="text">Seleccione la columna a utilizar para cada uno de los parámetros del modelo</h3>
            <ContenedorRelacionar/>
            <BotonesInferior primerBoton="Cambiar archivo" segundoBoton="Aplicar modelo" linkPrimero='/dashboard/subir' linkSegundo='/dashboard/subir/cargar'/>
        </div>
    )
}

export default RelacionarColumnas