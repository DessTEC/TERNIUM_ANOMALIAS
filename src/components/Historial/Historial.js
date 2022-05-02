import { Link } from 'react-router-dom';
import logo from '../../assets/terniumLogo.png';
import industria from '../../assets/industria.png';
import { SearchBar } from '../SearchBar/SearchBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

import { useState, useEffect } from "react";

export const Historial = () => {

    useEffect(() => {
        fetchReportes();
    }, []);

    const [reportes, setReportes] = useState([]);

    const fetchReportes = async () => {
        console.log("Consultando");
        const result = await axios.get(
          "http://localhost:4000/reportes"
        );

        setReportes(result.data);
    };

    return (
          <div>
            <div className='max-w-[1240px] mx-auto text-black relative mb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-1 relative gap-y-10 px-4 pt-20 justify-items-center'>
                    <div className='w-full'>
                        <button className="btn btn-primary bg-[#F25C29] border-0 hover:bg-[#D15226]">
                            <FontAwesomeIcon icon={faFilter} className="buttonIcon"/>
                            Filtros
                        </button>
                        <p className='text-black font-bold text-center text-xl'>CONSULTAR</p>
                        <p className='text-black font-normal text-center text-xl pb-3'>Navega por los reportes generados anteriormente</p>
                        <SearchBar />
                    </div>
                     {
                        reportes.map( reporte => {
                            return(
                                <Link key={reporte.id} to={reporte.id} className='bg-[#F3F6FF] rounded-t-xl rounded-b-xl pb-2 w-2/3'>
                                    <div className='p-4 w-full'>
                                        <p className='text-black font-bold text-left text-xl'>{reporte.name}</p>
                                        <p className='text-black font-normal text-left text-l'>{`${reporte.modelos} modelos`}</p>
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