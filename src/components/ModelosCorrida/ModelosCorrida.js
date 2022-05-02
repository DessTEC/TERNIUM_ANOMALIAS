import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import logo from '../../assets/terniumLogo.png';
import industria from '../../assets/industria.png';
import { SearchBar } from '../SearchBar/SearchBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import axios from "axios";

export const ModelosCorrida = () => {

    const params = useParams();

    useEffect(() => {
        fetchModelos();
    }, []);

    const [modelos, setModelos] = useState([]);

    const fetchModelos = async () => {
        console.log(params.reporteId);
        const result = await axios.get(
            "http://localhost:4000/getAllModelosByReporteId", {params: {
                reporteId: params.reporteId 
            }});


        setModelos(result.data);
    };

    return (
          <div>
            {/* <Link to="modelo">
                {params.nombre} / Modelo1
            </Link> */}
            <div className='max-w-[1240px] mx-auto text-black relative mb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-1 relative gap-y-3 px-4 pt-20 justify-items-center'>
                    <div className='w-full'>
                        <button className="btn btn-primary bg-[#F25C29] border-0 hover:bg-[#D15226]">
                            <FontAwesomeIcon icon={faFilter} className="buttonIcon"/>
                            Filtros
                        </button>
                        <p className='text-black font-bold text-center text-xl'>CONSULTAR</p>
                        <p className='text-black font-normal text-center text-xl pb-3'>Navega por los reportes generados anteriormente</p>
                        <SearchBar />
                    </div>
                    <div className='w-2/3 d-flex justify-content-between'>
                        <Link to={'/dashboard/consultar'} className="bg-[#FFFFFF] text-black border-0 hover:bg-[#FFFFFF] text-xl font-bold">
                            <FontAwesomeIcon icon={faArrowLeft} className="buttonIcon pr-5"/>
                            {params.nombre}
                        </Link>
                        <button className="btn text-white bg-[#F25C29] border-0 hover:bg-[#D15226]">
                            <FontAwesomeIcon icon={faPlus} className="buttonIcon"/>
                            Nuevo modelo
                        </button>
                    </div>
                    <hr className="w-2/3 p-0"/>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-1 relative gap-y-10 px-4 pt-4 justify-items-center'>
                    {
                        modelos.map( modelo => {
                            return(
                                <Link to={modelo.id} className='bg-[#F3F6FF] rounded-t-xl rounded-b-xl pb-2 w-2/3'>
                                    <div className='p-4 w-full'>
                                        <p className='text-black font-bold text-left text-xl'>{modelo.name}</p>
                                        <p className='text-black font-normal text-left text-l'>Fecha de ejecución: {modelo.fecha}</p>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
            </div>
          </div>
    );
};