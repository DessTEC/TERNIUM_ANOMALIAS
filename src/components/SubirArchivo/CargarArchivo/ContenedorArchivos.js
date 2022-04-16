import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const ContenedorArchivos = () =>{
    return(
        <div className="rounded containerArchivos">
            <div id="containerIcono">
                <FontAwesomeIcon icon={faUpload} className="iconoSubida"/>
            </div>
            <h5 className="text">Arrastra los archivos aqui</h5>
            <h5 className="text">O</h5>
            <div className="container">
                <button className="btn btn-warning" id="white">Buscar Archivos</button>
            </div>
        </div>
    )
}

export default ContenedorArchivos
