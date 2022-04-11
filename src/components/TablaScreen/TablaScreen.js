import "./TablaScreen.css"
import Tabla from "../tabla/Tabla";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";

export const TablaScreen = () => {

    return(
        <div>
            <div className="container-buttons">
                <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faFilter} className="buttonIcon"/>
                    Filtros
                </button>
                <button className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faFileArrowDown} className="buttonIcon"/>
                    Descargar
                </button>
            </div>
            <Tabla hasCheckboxes={false}/>
        </div>
    );
}
