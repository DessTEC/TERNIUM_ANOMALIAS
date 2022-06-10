import { Droppable, Draggable} from "react-beautiful-dnd"
import BloqueSubido from "./BloqueSubido"

const BloqueAtributo = (props) =>{

    let classesContainerNormal = "rounded " + props.color + " " + props.claseNormal
    let classesContainerDotted = "rounded overflow-auto " + props.claseDotted 
    return(
        <div className={classesContainerNormal}>
                        <div className="container">
                            <Droppable droppableId={props.id}>
                                { (droppableProvided) => (
                                <ul className={classesContainerDotted}
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