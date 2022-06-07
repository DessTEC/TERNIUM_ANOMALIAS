import { Outlet } from 'react-router-dom';
import { NavLink } from '../NavLink/NavLink';

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

export const TabBar = () => {

    const params = useParams();
    const [dataModelo, setDataModelo] = useState(undefined);
    const [atributos, setAtributos] = useState(undefined);
    const [nombreModelo, setNombreModelo] = useState(undefined);
    const [diccionario, setDiccionario] = useState(undefined);
    const [actInt, setActInt] = useState(undefined);
    const [actExt, setActExt] = useState(undefined);
    const [calendarMin, setCalendarMin ] = useState(undefined);
    const [calendarMax, setCalendarMax] = useState(undefined);

    useEffect(() => {
        getModelo();
        console.log(calendarMax);
        console.log(calendarMin);
     }, [])
 
     const getModelo = async() => {
         const result = await axios.get(
             "http://localhost:4000/getModeloById", {params: {id: params.modeloId}}, 
         );
         console.log(result);
         setDataModelo(result["data"]["results"]);
         setAtributos(result["data"]["variables"]);
         setNombreModelo(result["data"]["name"]);
         setDiccionario(result["data"]["diccionario"]);
         setActInt(result["data"]["actoresInternos"]);
         setActExt(result["data"]["actoresExternos"]);
         setCalendarMin(result["data"]["minDate"]);
         setCalendarMax(result["data"]["maxDate"]);
     }

    return (
            <div className="mt-3 ml-5 text-sm font-medium text-center mr-10">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <NavLink 
                            className="inline-block p-2 rounded-t-lg border-b-2"
                            activeClassName= "text-[#F25C29] border-[#F25C29] hover:border-[#c62901] hover:text-[#c62901]"
                            inactiveClassName= "text-gray-400 border-gray-300 hover:text-gray-600 hover:border-gray-600"
                            to=""
                            exact={true}
                        >
                            Tabla
                        </NavLink>
                    </li>
                    <li className="mr-2">
                        <NavLink 
                            className="inline-block p-2 rounded-t-lg border-b-2"
                            activeClassName= "text-[#F25C29] border-[#F25C29] hover:border-[#c62901] hover:text-[#c62901]"
                            inactiveClassName= "text-gray-400 border-gray-300 hover:text-gray-600 hover:border-gray-600"
                            to="graficas"
                        >
                            Gráficas
                        </NavLink>
                    </li>
                    <li className="mr-2">
                        <NavLink 
                            className="inline-block p-2 rounded-t-lg border-b-2"
                            activeClassName= "text-[#F25C29] border-[#F25C29] hover:border-[#c62901] hover:text-[#c62901]"
                            inactiveClassName= "text-gray-400 border-gray-300 hover:text-gray-600 hover:border-gray-600"
                            to="diccionario"
                        >
                            Diccionario
                        </NavLink>
                    </li>
                </ul>

                <div className='w-full'>
                    {
                        atributos === undefined || dataModelo === undefined ? <></>:
                        <Outlet context={[dataModelo, atributos, nombreModelo, diccionario, actInt, actExt, calendarMin, calendarMax]}/>
                    }
                </div>
            </div>  
        
    )
}