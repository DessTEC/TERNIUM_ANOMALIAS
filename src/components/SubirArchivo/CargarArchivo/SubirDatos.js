import Steps from "../Pasos/Steps"
import ContenedorArchivos from "./ContenedorArchivos"
import BotonesInferior from "./BotonesInferior"
import "../SubirDatos.css"
const SubirDatos = () =>{
    return (
        <div>
            <h2 className="text">SUBIR ARCHIVO</h2>
            <h3 className="text">Sube el archivo que deseas analizar</h3>
            <ContenedorArchivos/>
            <BotonesInferior primerBoton="Cancelar" segundoBoton="Configurar parametros" linkPrimero='/' linkSegundo='/dashboard/subir/parametros'/>
        </div>
    )
}

export default SubirDatos