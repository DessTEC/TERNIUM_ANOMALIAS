import { Droppable, Draggable} from "react-beautiful-dnd"
import BloqueSubido from "./BloqueSubido"

const BloqueAtributo = (props) =>{

    let classes = "rounded containerRelacionar " + props.color

    return(
        <div className={classes}>
                        <div className="container">
                            <Droppable droppableId={props.id}>
                                { (droppableProvided) => (
                                <ul className="rounded containerDotted overflow-auto"
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef}
                                >
                                    {props.arregloAtributos.map((atributo, index) => (
                                        <Draggable key={atributo} draggableId={atributo} index={index}>
                                            {(draggableProvided) => (
                                                <li 
                                                {...draggableProvided.draggableProps}
                                                ref={draggableProvided.innerRef}
                                                {...draggableProvided.dragHandleProps}
                                                ><BloqueSubido nombreAtributo={atributo} espacio=" containerSeleccionado"/></li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {droppableProvided.placeholder}
                                </ul>
                                )}
                            </Droppable>
                        </div>
                    </div>
    )
}

export default BloqueAtributo