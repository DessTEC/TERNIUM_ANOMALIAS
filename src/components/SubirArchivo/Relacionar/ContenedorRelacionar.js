import Externos from "./Externos"
import Internos from "./Internos"
import ArtibutosColumnas from "./AtributosColumna"
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import { faReorder } from "@fortawesome/free-solid-svg-icons"
import BloqueAtributo from "./BloqueAtributo"
import {useState, useEffect} from "react"
import BloqueSubido from "./BloqueSubido"
import { Buscar } from "./Buscar"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Contenedor = (props) => {

    const externos1 = [{}]


    
    const [atributos, setAtributos] = useState(props.columnas);
    const [externo1, setExterno1] = useState(externos1)

    const [showModal, setShowModal] = useState(false);


    useEffect(() => {

        console.log(props.columnas);

        if(props.columnas.length === 0){
            setShowModal(true);
        }else{
            setAtributos(props.columnas)
        }
    }, []);


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
                                                <Draggable key={index} draggableId={index} index={index}>
                                                    {(draggableProvided) => (
                                                        
                                                        <li 
                                                        {...draggableProvided.draggableProps}
                                                        ref={draggableProvided.innerRef}
                                                        {...draggableProvided.dragHandleProps}
                                                        ><BloqueSubido nombreAtributo={atributo}/></li>
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
                                <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                                    {(draggableProvided) => (
                                        <li 
                                        {...draggableProvided.draggableProps}
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.dragHandleProps}
                                        ><BloqueSubido nombreAtributo={atributo}/></li>
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

            <div className={!showModal ? 'hidden' : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#1D2533]/30"}>
                <div className="relative p-4 w-1/3 max-w-7xl h-full mx-auto mt-64">
                    <div className="relative bg-white rounded-lg shadow h-64">
                        <div className="flex flex-col center p-3 rounded-t w-full">
                            <FontAwesomeIcon icon={faCircleExclamation} className='w-full h-1/3 text-[#F6A000]'/>
                            <h3 className="text-center mt-4">
                                Por favor sube un archivo válido
                            </h3>
                            <h5 className="text-center mt-4">
                                El archivo subido está vacío
                            </h5>
                            <div className="flex flex-row justify-center mt-4">
                                <Link to='/dashboard/subir'>
                                    <button className="text-slate-50 font-medium rounded-3xl text-lg text-center hover:text-slate-50 bg-[#FF3502] border-none hover:bg-[#c62901] py-1.5 px-3 mb-4"
                                    >Subir otro archivo</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DragDropContext>
    )
}

export default Contenedor