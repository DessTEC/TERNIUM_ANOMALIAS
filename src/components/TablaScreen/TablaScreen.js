import "./TablaScreen.css"
import Tabla from "./Tabla";

export const TablaScreen = () => {

    return(
        <div>
            <div className="container-buttons">
                <button className="btn btn-primary">Filtros</button>
                <button className="btn btn-outline-primary">Descargar</button>
            </div>
            <Tabla/>
        </div>
    );
}
