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
    const [externo1, setExterno1] = useState([])
    const [externo2, setExterno2] = useState([])
    const [externo3, setExterno3] = useState([])
    const [externo4, setExterno4] = useState([])
    const [externo5, setExterno5] = useState([])
    const [interno1, setInterno1] = useState([])
    const [interno2, setInterno2] = useState([])
    const [interno3, setInterno3] = useState([])
    const [interno4, setInterno4] = useState([])
    const [interno5, setInterno5] = useState([])


    const onDragEnd = (result) => {

        // console.log(result)
        const {source, destination} = result;
        if(!destination) return;

        if(destination.droppableId === source.droppableId && source.index === destination.index) return
    
        let add, arregloExterno1 = externo1, arregloExterno2 = externo2, arregloExterno3 = externo3,arregloExterno4 = externo4,arregloExterno5 = externo5;
        let arregloInterno1 = interno1, arregloInterno2 = interno2, arregloInterno3 = interno3, arregloInterno4 = interno4, arregloInterno5 = interno5; 
        let subidos = atributos;
        

        //-------------SOURCE LOGIC------------------------

        //Para subidos
        if(source.droppableId === "subidos"){
            add = subidos[source.index];
            subidos.splice(source.index,1);
            console.log("el bloque sale de subidos")
        }

        //---------EXTERNOS------------
        //Para externos 1
        else if(source.droppableId === "externo1"){
            add = arregloExterno1[source.index]
            arregloExterno1.splice(source.index,1)
            console.log("el bloque sale de externos 1")
        }
        //Para externos 2
        else if(source.droppableId === "externo2"){
            add = arregloExterno2[source.index]
            arregloExterno2.splice(source.index,1)
            console.log("el bloque sale de externos 2")
        }
        //Para externos 3
        else if(source.droppableId === "externo3"){
            add = arregloExterno3[source.index]
            arregloExterno3.splice(source.index,1)
            console.log("el bloque sale de externos 3")
        }
        //Para externos 4
        else if(source.droppableId === "externo4"){
            add = arregloExterno4[source.index]
            arregloExterno4.splice(source.index,1)
            console.log("el bloque sale de externos 4")
        }
        //Para externos 5
        else if(source.droppableId === "externo5"){
            add = arregloExterno5[source.index]
            arregloExterno5.splice(source.index,1)
            console.log("el bloque sale de externos 5")
        }

        //---------INTERNOS------------
        //Para internos 1
        else if(source.droppableId === "interno1"){
            add = arregloInterno1[source.index]
            arregloInterno1.splice(source.index,1)
            console.log("el bloque sale de interno 1")
        }
        //Para interno 2
        else if(source.droppableId === "interno2"){
            add = arregloInterno2[source.index]
            arregloInterno2.splice(source.index,1)
            console.log("el bloque sale de internos 2")
        }
        //Para externos 3
        else if(source.droppableId === "interno3"){
            add = arregloInterno3[source.index]
            arregloInterno3.splice(source.index,1)
            console.log("el bloque sale de internos 3")
        }
        //Para internos 4
        else if(source.droppableId === "interno4"){
            add = arregloInterno4[source.index]
            arregloInterno4.splice(source.index,1)
            console.log("el bloque sale de internos 4")
        }
        //Para internos 5
        else if(source.droppableId === "interno5"){
            add = arregloInterno5[source.index]
            arregloInterno5.splice(source.index,1)
            console.log("el bloque sale de internos 5")
        }




        //-------------DESTINATION LOGIC------------------------
        if(destination.droppableId === "subidos"){
            subidos.splice(destination.index,0,add)
            console.log("el bloque llega a subidos")
        }
        // Para externo 1
        else if(destination.droppableId === "externo1" && externo1.length <= 0 ){
            arregloExterno1.splice(destination.index,0,add)
            console.log("el bloque llega a externo 1 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 2
        else if(destination.droppableId === "externo2" && externo2.length <= 0){
            arregloExterno2.splice(destination.index,0,add)
            console.log("el bloque llega a externo 2 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 3
        else if(destination.droppableId === "externo3" && externo3.length <= 0){
            arregloExterno3.splice(destination.index,0,add)
            console.log("el bloque llega a externo 3 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 4
        else if(destination.droppableId === "externo4" && externo4.length <= 0){
            arregloExterno4.splice(destination.index,0,add)
            console.log("el bloque llega a externo 4 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 5
        else if(destination.droppableId === "externo5" && externo5.length <= 0){
            arregloExterno5.splice(destination.index,0,add)
            console.log("el bloque llega a externo 5 y el tamaño del arreglo ahora es de 1")
        }
        //en caso de que el externo que se desea relacionar ya esta ocupado
        else if((destination.droppableId === "externo1" && externo1.length >= 1) || (destination.droppableId === "externo2" && externo2.length >= 1) || (destination.droppableId === "externo3" && externo3.length >= 1) || (destination.droppableId === "externo4" && externo4.length >= 1) || (destination.droppableId === "externo5" && externo5.length >= 1)){
            subidos.splice(source.index,0,add)
            console.log("el bloque llega a externo 1 pero el tamaño del arreglo es de 1 o más")
        }

        //-----------INTERNOS------------
        // Para interno 1
        else if(destination.droppableId === "interno1" && interno1.length <= 0 ){
            arregloInterno1.splice(destination.index,0,add)
            console.log("el bloque llega a interno 1 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 2
        else if(destination.droppableId === "interno2" && interno2.length <= 0){
            arregloInterno2.splice(destination.index,0,add)
            console.log("el bloque llega a interno 2 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 3
        else if(destination.droppableId === "interno3" && interno3.length <= 0){
            arregloInterno3.splice(destination.index,0,add)
            console.log("el bloque llega a interno 3 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 4
        else if(destination.droppableId === "interno4" && interno4.length <= 0){
            arregloInterno4.splice(destination.index,0,add)
            console.log("el bloque llega a interno 4 y el tamaño del arreglo ahora es de 1")
        }
        //Para externo 5
        else if(destination.droppableId === "interno5" && interno5.length <= 0){
            arregloInterno5.splice(destination.index,0,add)
            console.log("el bloque llega a interno 5 y el tamaño del arreglo ahora es de 1")
        }
        //en caso de que el interno que se desea relacionar ya esta ocupado
        else if((destination.droppableId === "interno1" && interno1.length >= 1) || (destination.droppableId === "interno2" && interno2.length >= 1) || (destination.droppableId === "interno3" && interno3.length >= 1) || (destination.droppableId === "interno4" && interno4.length >= 1) || (destination.droppableId === "interno5" && interno5.length >= 1)){
            subidos.splice(source.index,0,add)
            console.log("el bloque llega a externo 1 pero el tamaño del arreglo es de 1 o más")
        }



        
        console.log("EXTERNOS:")
        console.log(externo1)
        console.log("INTERNOS")
        console.log(atributos)
        console.log("EXTERNOS2")
        console.log(externo2)
        setAtributos(subidos)
        setExterno1(arregloExterno1)
        setExterno2(arregloExterno2)
        setExterno3(arregloExterno3)
        setExterno4(arregloExterno4)
        setExterno5(arregloExterno5)
        setInterno1(arregloInterno1)
        setInterno2(arregloInterno2)
        setInterno3(arregloInterno3)
        setInterno4(arregloInterno4)
        setInterno5(arregloInterno5)
        
    }

    //se necesita desplegar en draggables los componentes de externos1
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="d-flex justify-content-between containerColumnas">
                {/* Columna de actores externos */}
                <div className="columna">
                    <h5>Actores externos</h5>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo1" arregloAtributos ={externo1}/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo2" arregloAtributos ={externo2}/>
                    {/* Falta conectar con drag and drop */}
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo3" arregloAtributos ={externo3}/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo4" arregloAtributos ={externo4}/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundNaranjaClaro" id="externo5" arregloAtributos ={externo5}/>
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
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno1" arregloAtributos={interno1}/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno2" arregloAtributos={interno2}/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno3" arregloAtributos={interno3}/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno4" arregloAtributos={interno4}/>
                    <BloqueAtributo titulo="Planta Transportista" color="backgroundAmarilloClaro" id="interno5" arregloAtributos={interno5}/>
                </div>
            </div>
        </DragDropContext>
    )
}

export default Contenedor