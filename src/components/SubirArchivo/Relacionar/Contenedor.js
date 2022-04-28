
import Externos from "./Externos"
import Internos from "./Internos"
import ArtibutosColumnas from "./AtributosColumna"
import { DragDropContext} from "react-beautiful-dnd"
import { faReorder } from "@fortawesome/free-solid-svg-icons"
const ContenedorRelacionar = () => {
    return (
        
            <div className="d-flex justify-content-between containerColumnas">
                <Externos/>
                <ArtibutosColumnas/>
                <Internos/>
            </div>
    )
}

export default ContenedorRelacionar