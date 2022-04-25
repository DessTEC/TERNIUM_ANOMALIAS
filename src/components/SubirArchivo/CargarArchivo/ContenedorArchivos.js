import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const ContenedorArchivos = () =>{


    function subirArchivo(){
        const archivoReal = document.getElementById("archivo-real");
        const botonArchivo = document.getElementById("boton-archivo");
        const textoArchivo = document.getElementById("texto-archivo");

        if(botonArchivo){
            botonArchivo.addEventListener("click", ()=> {
                archivoReal.click();
                console.log("click")
            });
        }

        
        if(archivoReal){
            console.log("archivoReal")
            archivoReal.addEventListener("change", function(){
                if(archivoReal.value){
                    textoArchivo.innerHTML = "Archivo seleccionado";
                }
                else{
                    textoArchivo.innerHTML = "Selecciona un archivo"
                }
            })
        }
    }

    return(
        <div className="rounded containerArchivos">
            <div id="containerIcono">
                <input type="file" id="archivo-real" hidden="hidden"/>
                <button id="boton-archivo" onClick={subirArchivo}>
                    <FontAwesomeIcon icon={faUpload} className="iconoSubida"/>
                </button>
                
            </div>
            <h5 className="text" id="texto-archivo">Arrastra los archivos aqui</h5>
            <h5 className="text">O</h5>
            <div className="container">
                <button className="btn btn-warning" id="white">Buscar Archivos</button>
            </div>
        </div>
    )
}

export default ContenedorArchivos
