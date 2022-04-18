import Tabla from "../tabla/Tabla";
import "./NuevoModeloScreen.css"

export const NuevoModeloScreen = () => {
    return(
        <div className='main'>
            <div className="header-screen">
                <h1>SELECCIONAR PARÁMETROS</h1>
                <button className="btn btn-outline-primary aplicar-modelo">Aplicar Modelo</button>
            </div>
            <Tabla hasCheckboxes={true}/>
        </div>
    );
}