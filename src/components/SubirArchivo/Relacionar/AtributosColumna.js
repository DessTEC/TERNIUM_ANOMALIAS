import BloqueSubido from "./BloqueSubido"
import { Buscar } from "./Buscar"
import './Relacionar.css'
import {useState} from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const ArtibutosColumnas = () => {

    
    const atributosIniciales = [
        {
            id: "1",
            text: "Planta Transportista 1"
        },
        {
            id: "2",
            text: "Planta Transportista 2"
        },
        {
            id: "3",
            text: "Planta Transportista 3"
        },
        {
            id: "4",
            text: "Planta Transportista 4"
        },
        {
            id: "5",
            text: "Planta Transportista 5"
        },
        {
            id: "6",
            text: "Planta Transportista 6"
        },
        {
            id: "7",
            text: "Planta Transportista 7"
        },
        {
            id: "8",
            text: "Planta Transportista 8"
        },
        {
            id: "9",
            text: "Planta Transportista 9"
        },
        {
            id: "10",
            text: "Planta Transportista 10"
        },
        {
            id: "11",
            text: "Planta Transportista 11"
        },
        {
            id: "12",
            text: "Planta Transportista 12"
        },
    ]


    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex,1);
        result.splice(endIndex,0,removed);
        return result
    }


    const [atributos, setAtributos] = useState(atributosIniciales)

    return (
        <div>

            <h5 className="centrarTexto">Columnas del archivo subido</h5>
            <Buscar/>
                <Droppable droppableId="subidos">
                    { (droppableProvided) => (
                    <ul className="columnaMedia overflow-auto"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                    >
                         {atributos.map((atributo, index) => (
                            <Draggable key={atributo.id} draggableId={atributo.id} index={index}>
                                 {(draggableProvided) => (
                                    <li 
                                    {...draggableProvided.draggableProps}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    ><BloqueSubido nombreAtributo={atributo.text}/></li>
                                 )}
                            </Draggable>
                        ))}
                        {droppableProvided.placeholder}
                    </ul>
                    )}
                </Droppable>
        </div>
    )
}

export default ArtibutosColumnas