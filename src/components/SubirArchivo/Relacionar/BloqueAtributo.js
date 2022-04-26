import { Droppable} from "react-beautiful-dnd"

const BloqueAtributo = (props) =>{

    let classes = "rounded containerRelacionar " + props.color
    const id = props.id

    return(
        <div className={classes}>
            <p className="tituloAtributo">{props.titulo}</p>
            <div className="container">
                <Droppable droppableId={id}>
                    {(provided) => (
                        <ul className="rounded containerDotted"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        >
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        </div>
    )
}

export default BloqueAtributo