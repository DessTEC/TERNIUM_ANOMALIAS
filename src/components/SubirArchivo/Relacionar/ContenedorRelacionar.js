import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import BloqueAtributo from "./BloqueAtributo"
import {useState} from "react"
import BloqueSubido from "./BloqueSubido"
import { Buscar } from "./Buscar"
import { useOutletContext } from "react-router-dom";
import { render } from "@testing-library/react"


const Contenedor = () => {

    const [file, setFile, dataCsv, setDataCsv, columnas, setColumnas, actInt, setActInt, actExt, setActExt, stepActual, setStepActual] = useOutletContext();
    
    const [atributos, setAtributos] = useState(columnas);

    const onDragEnd = (result) => {

        // console.log(result)
        const {source, destination} = result;
        if(!destination) return;

        if(destination.droppableId === source.droppableId && source.index === destination.index) return
    
        let add, arregloExternos = actExt, subidos = atributos, arregloInternos = actInt;
        

        //-------------SOURCE LOGIC------------------------

        //Para subidos
        if(source.droppableId === "subidos"){
            add = subidos[source.index];
            subidos.splice(source.index,1);
        }

        //---------EXTERNOS------------
        else if(source.droppableId === "externos"){
                add = arregloExternos[source.index]
                arregloExternos.splice(source.index,1)
        }


        //---------INTERNOS------------
        else if(source.droppableId === "internos"){
            add = arregloInternos[source.index]
            arregloInternos.splice(source.index,1)
        }



        //-------------DESTINATION LOGIC------------------------
        if(destination.droppableId === "subidos"){
            subidos.splice(destination.index,0,add)
        }
        else if(destination.droppableId === "externos"){
            arregloExternos.splice(destination.index,0,add)
        }

        //-----------INTERNOS------------

        else if(destination.droppableId === "internos"){
            arregloInternos.splice(destination.index,0,add)
        }



        
        setAtributos(subidos)
        setActExt(arregloExternos)
        setActInt(arregloInternos)
        
    }


    //se necesita desplegar en draggables los componentes de externos1
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="d-flex justify-content-between containerColumnas">
                {/* Columna de actores externos */}
                <div className="columna">
                    <h5>Actores externos</h5>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externos" arregloAtributos ={actExt}/>
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
                                <Draggable key={atributo} draggableId={atributo} index={index}>
                                    {(draggableProvided) => (
                                        <li
                                        {...draggableProvided.draggableProps}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                        ><BloqueSubido nombreAtributo={atributo} espacio=" containerSubido"/></li>
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
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="internos" arregloAtributos={actInt}/>
                </div>
            </div>
        </DragDropContext>
    )
}




export default Contenedor