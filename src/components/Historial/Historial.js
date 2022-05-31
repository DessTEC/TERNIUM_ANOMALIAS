import { Link } from 'react-router-dom';
import logo from '../../assets/terniumLogo.png';
import industria from '../../assets/industria.png';
import { SearchBar } from '../SearchBar/SearchBar';

import DropDownMenuOption from "../chartFilterMenu/DropDownMenuOption";
import CalendarFilterDropdown from "../chartFilterMenu/CalendarFilterDropdown";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect, useRef} from "react";
import moment from 'moment';

export const Historial = () => {

    const ref = useRef();

    const [inputValueStart, setInputValueStart] = useState('');
    const [inputValueEnd, setInputValueEnd] = useState('');

    const [initDate, setInitDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleClick = () => {
      setIsMenuOpen(true);
    };
  
    useEffect(() => {
      const checkClickOutside = (e) => {
        if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener("click", checkClickOutside);
  
      return () => {
        document.removeEventListener("click", checkClickOutside);
      };
    }, [isMenuOpen]);


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
        console.log(reportes[0].fecha.$date);
    };

    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };

    const [reporteToDelete, setReporteToDelete] = useState();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    const handleSelectReporteToDelete = idReporte => () => {
        setReporteToDelete(idReporte);
        setShowModal(true);
    }

    const deleteReporte =  async () => {
        await axios.delete(
            "http://localhost:4000/deleteReporte", {params: {
                id: reporteToDelete
        }});
        setShowModal(false);
        fetchReportes();
    };

    return (
          <div>
            <div className='max-w-[1240px] mx-auto text-black relative mb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-1 relative gap-y-10 px-4 pt-20 justify-items-center'>
                    <div className='w-full'>
                        <div>
                            <button className="btn btn-primary bg-[#F25C29] border-0 hover:bg-[#D15226]" onClick={handleClick}>
                                <FontAwesomeIcon icon={faCalendarDays} className="buttonIcon"/>
                                Filtrar
                            </button>
                            {isMenuOpen && ( 
                            <div className='absolute m-auto text-center' ref={ref}>
                            <CalendarFilterDropdown initDate={initDate} endDate={endDate} setInitDate={setInitDate} setEndDate={setEndDate} inputValueStart = {inputValueStart} setInputValueStart = {setInputValueStart} inputValueEnd = {inputValueEnd} setInputValueEnd = {setInputValueEnd}/>
                            </div>)}
                        </div>
                        <p className='text-black font-bold text-center text-xl'>CONSULTAR</p>
                        <p className='text-black font-normal text-center text-xl pb-3'>Navega por los reportes generados anteriormente</p>
                        <form action="/" method="get" className='text-center'>
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Buscar por nombre"
                                name="s" 
                                className='bg-[#F2F2F2] rounded-xl pt-2 pb-2 pl-3 w-1/3'
                                value={wordEntered}
                                onChange={handleFilter}
                            />
                        </form>
                    </div>
                     { //if(today >= from && today <= to)
                        reportes.filter((value) => {
                            if(initDate == null || endDate == null){
                                return value.name.toLowerCase().includes(wordEntered.toLowerCase());
                            }else{
                                let reportDate = new Date(value.fecha.$date);
                                return reportDate >= initDate && reportDate <= endDate && value.name.toLowerCase().includes(wordEntered.toLowerCase());
                            }
                            
                        }).map( reporte => {
                            return(
                                <div key={reporte["_id"]["$oid"]} className='bg-[#F3F6FF] rounded-t-xl rounded-b-xl pb-2 w-2/3'>
                                    <div className="flex flex-row p-4 w-full">
                                        <Link to={reporte["_id"]["$oid"]} className="w-3/4">
                                            <p className='text-black font-bold text-left text-xl'>{reporte.name}</p>
                                            <p className='text-black font-normal text-left text-l'>Fecha de ejecución: {moment(reporte["fecha"]["$date"]).locale("es").format("DD-MMMM-YYYY")}</p>
                                            <p className='text-black font-normal text-left text-l'>{`${reporte.modelos} modelos`}</p>
                                        </Link>
                                        <div className="flex w-1/4 justify-end">
                                            <div className= "my-auto mr-4 cursor-pointer" onClick={handleSelectReporteToDelete(reporte["_id"]["$oid"]) }>
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    className="w-6 h-6 text-black"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className={!showModal ? 'hidden' : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#1D2533]/30"}>
                <div className="relative p-4 w-1/3 max-w-7xl h-full mx-auto mt-64">
                    <div className="relative bg-white rounded-lg shadow h-80">
                        <div className="flex flex-col center p-3 rounded-t w-full">
                            <div className="flex flex-row justify-end">
                                <button onClick={handleClose} className="bg-slate-50 hover:bg-slate-300 rounded-lg p-1.5 ml-auto inline-flex items-center text-gray-400 hover:text-gray-900">
                                    <FontAwesomeIcon icon={faXmark} className='w-5' />
                                </button>
                            </div>
                            <FontAwesomeIcon icon={faCircleExclamation} className='w-full h-1/3 text-[#F6A000]'/>
                            <h3 className="text-center mt-4 text-base leading-7 mb-1">
                                Al eliminar el reporte se borrarán los modelos generados en él. ¿Deseas continuar?
                            </h3>
                            <div className="flex flex-row justify-evenly mt-4">
                                <button onClick={deleteReporte} className="bg-[#f25c29] text-white font-bold py-2 px-4 rounded">
                                    Eliminar
                                </button>
                                <button onClick={handleClose} className="bg-white border-2 border-solid border-[#f25c29] text-black font-bold py-2 px-4 rounded">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    );
};