import { Droppable} from "react-beautiful-dnd"

const BloqueAtributo = (props) =>{

    let classes = "rounded containerRelacionar " + props.color
    
    return(
        <div className={classes}>
            <p className="tituloAtributo">{props.titulo}</p>
            <div className="container">
                {/* <Droppable droppableId={props.id}> */}
                    <div className="rounded containerDotted"></div>
                {/* </Droppable> */}
            </div>
        </div>
    )
}

export default BloqueAtributo