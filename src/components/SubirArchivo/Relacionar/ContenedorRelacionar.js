import Externos from "./Externos"
import Internos from "./Internos"
import ArtibutosColumnas from "./AtributosColumna"
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import { faReorder } from "@fortawesome/free-solid-svg-icons"
import BloqueAtributo from "./BloqueAtributo"
import {useState} from "react"
import BloqueSubido from "./BloqueSubido"
import { Buscar } from "./Buscar"


const Contenedor = () => {

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

    const externos1 = [{}]

    
    const [atributos, setAtributos] = useState(atributosIniciales)
    const [externo1, setExterno1] = useState(externos1)




    const onDragEnd = (result) => {

        console.log(result)
        const {source, destination} = result;
        if(!destination) return;

        if(destination.droppableId == source.droppableId && source.index == destination.index) return
    
        let add, externos = externo1, subidos = atributos;

        if(source.droppableId === "subidos"){
            add = subidos[source.index];
            subidos.splice(source.index,1);
        }
        else if(source.droppableId === "externo1"){
            add = externos[source.index]
            externos.splice(source.index,1)
        }

        if(destination.droppableId === "subidos"){
            subidos.splice(destination.index,0,add)
        }
        else if(destination.droppableId === "externo1" && externo1.length < 2){
            externos.splice(destination.index,0,add)
        }
        else if(destination.droppableId === "externo1" && externo1.length >= 2){
            subidos.splice(source.index,0,add)
        }
        
        console.log("EXTERNOS:")
        console.log(externo1)
        console.log("INTERNOS")
        console.log(atributos)
        setAtributos(subidos)
        setExterno1(externos)
        
    }

    //se necesita desplegar en draggables los componentes de externos1
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div class="d-flex justify-content-between containerColumnas">
                {/* Columna de actores externos */}
                <div className="columna">
                    <h5>Actores externos</h5>
                    {/* <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo1"/> */}
                    <div className="rounded containerRelacionar backgroundNaranjaClaro">
                        <p className="tituloAtributo">Planta Porteria</p>
                        <div className="container">
                            <Droppable droppableId="externo1">
                                {(provided) => (
                                    <ul className="rounded containerDotted"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    >
                                        {externo1.map((atributo, index) => {
                                            if(externo1.length >= 1)
                                                return (<div></div>)
                                            else{
                                                <Draggable key={atributo.id} draggableId={atributo.id} index={index}>
                                                    {(draggableProvided) => (
                                                        
                                                        <li 
                                                        {...draggableProvided.draggableProps}
                                                        ref={draggableProvided.innerRef}
                                                        {...draggableProvided.dragHandleProps}
                                                        ><BloqueSubido nombreAtributo={atributo.text}/></li>
                                                    )}
                                                </Draggable>
                                        }})}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </div>
                    </div>
                    {/* <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo2"/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo3"/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo4"/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo5"/> */}
                </div>

                <div className="columna">

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


                <div className="columna">
                    <h5 className="alinearDerecha">Actores internos</h5>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno1" />
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno2"/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno3"/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno4"/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno5"/>
                </div>
            </div>
        </DragDropContext>
    )
}

export default Contenedor