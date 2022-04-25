
import Externos from "./Externos"
import Internos from "./Internos"
import ArtibutosColumnas from "./AtributosColumna"
import { DragDropContext} from "react-beautiful-dnd"
const ContenedorRelacionar = () => {
    return (
        
            <div class="d-flex justify-content-between containerColumnas">
                <Externos/>
                <ArtibutosColumnas/>
                <Internos/>
            </div>
    )
}

export default ContenedorRelacionar