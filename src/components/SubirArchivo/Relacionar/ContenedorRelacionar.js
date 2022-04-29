import Externos from "./Externos"
import Internos from "./Internos"
import ArtibutosColumnas from "./AtributosColumna"
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
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


    
    const [atributos, setAtributos] = useState(atributosIniciales)
    const [externos, setExternos] = useState([])
    const [internos, setInternos] = useState([])


    const onDragEnd = (result) => {

        // console.log(result)
        const {source, destination} = result;
        if(!destination) return;

        if(destination.droppableId === source.droppableId && source.index === destination.index) return
    
        let add, arregloExternos = externos, subidos = atributos, arregloInternos = internos;
        

        //-------------SOURCE LOGIC------------------------

        //Para subidos
        if(source.droppableId === "subidos"){
            add = subidos[source.index];
            subidos.splice(source.index,1);
            console.log("el bloque sale de subidos")
        }

        //---------EXTERNOS------------
        else if(source.droppableId === "externos"){
                add = arregloExternos[source.index]
                arregloExternos.splice(source.index,1)
                console.log("el bloque sale de externos 1")
        }


        //---------INTERNOS------------
        else if(source.droppableId === "internos"){
            add = arregloInternos[source.index]
            arregloInternos.splice(source.index,1)
            console.log("el bloque sale de internos 1")
        }



        //-------------DESTINATION LOGIC------------------------
        if(destination.droppableId === "subidos"){
            subidos.splice(destination.index,0,add)
            console.log("el bloque llega a subidos")
        }
        else if(destination.droppableId === "externos"){
            arregloExternos.splice(destination.index,0,add)
            console.log("el bloque llega a externos y el tamaño del arreglo ahora es de 1")
        }

        //-----------INTERNOS------------

        else if(destination.droppableId === "internos"){
            arregloInternos.splice(destination.index,0,add)
            console.log("el bloque llega a internos y el tamaño del arreglo ahora es de 1")
        }



        
        console.log("EXTERNOS:")
        console.log(externos)
        console.log("INTERNOS")
        console.log(internos)
        setAtributos(subidos)
        setExternos(arregloExternos)
        setInternos(arregloInternos)
        
    }

    //se necesita desplegar en draggables los componentes de externos1
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="d-flex justify-content-between containerColumnas">
                {/* Columna de actores externos */}
                <div className="columna">
                    <h5>Actores externos</h5>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externos" arregloAtributos ={externos}/>
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
                                        ><BloqueSubido nombreAtributo={atributo.text} espacio=" containerSubido"/></li>
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
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="internos" arregloAtributos={internos}/>
                </div>
            </div>
        </DragDropContext>
    )
}

export default Contenedor