import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import logo from '../../assets/terniumLogo.png';
import industria from '../../assets/industria.png';
import { SearchBar } from '../SearchBar/SearchBar';
import CalendarFilterDropdown from "../chartFilterMenu/CalendarFilterDropdown";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export const ModelosCorrida = () => {

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

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchModelos();
        fetchNombreReporte();
    }, []);

    const [modelos, setModelos] = useState([]);
    const [reporte, setReporte] = useState([]);
    const [modeloToDelete, setModeloToDelete] = useState();

    const fetchModelos = async () => {
        console.log(params.reporteId);
        const result = await axios.get(
            "http://localhost:4000/getAllModelosByReporteId", {params: {
                reporteId: params.reporteId 
            }});


        setModelos(result.data);
    };

    const fetchNombreReporte = async () => {
        console.log("Fetch nombre reporte");
        const result = await axios.get(
            "http://localhost:4000/getReporteById", {params: {
                id: params.reporteId,
                reporteId: params.reporteId 
            }});


        setReporte(result.data);
    };

    const handleSelectModeloToDelete = idModelo => () => {
        setModeloToDelete(idModelo);
        setShowModal(true);
    }

    const deleteModelo =  async () => {
        await axios.delete(
            "http://localhost:4000/deleteModelo", {params: {
                id: modeloToDelete
        }});
        setShowModal(false);
        fetchModelos();
    };

    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };

    const handleNewModelo = () => {
        navigate(`/dashboard/consultar/${params.reporteId}/nuevoModelo`);
    }

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false);
    }

    return (
          <div>
            {/* <Link to="modelo">
                {params.nombre} / Modelo1
            </Link> */}
            <div className='max-w-[1240px] mx-auto text-black relative mb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-1 relative gap-y-3 px-4 pt-20 justify-items-center'>
                    <div className='w-full'>
                        <div>
                            <button className="btn btn-primary bg-[#F25C29] border-0 hover:bg-[#D15226]" onClick={handleClick}>
                                <FontAwesomeIcon icon={faCalendarDays} className="buttonIcon"/>
                                Filtros
                            </button>
                            {isMenuOpen && ( 
                            <div className='absolute m-auto text-center z-10' ref={ref}>
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
                    <div className='w-2/3 d-flex justify-content-between'>
                        <Link to={'/dashboard/consultar'} className="bg-[#FFFFFF] text-black border-0 hover:bg-[#FFFFFF] text-xl font-bold">
                            <FontAwesomeIcon icon={faArrowLeft} className="buttonIcon pr-5"/>
                            {reporte.name}
                        </Link>
                        <button className="btn text-white bg-[#F25C29] border-0 hover:bg-[#D15226]" onClick={handleNewModelo}>
                            <FontAwesomeIcon icon={faPlus} className="buttonIcon"/>
                            Nuevo modelo
                        </button>
                    </div>
                    <hr className="w-2/3 p-0"/>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-1 relative gap-y-10 px-4 pt-4 justify-items-center'>
                    {
                        modelos.filter((value) => {
                            if(initDate == null || endDate == null){
                                return value.name.toLowerCase().includes(wordEntered.toLowerCase());
                            }else{
                                let reportDate = new Date(value.fecha.$date);
                                return reportDate >= initDate && reportDate <= endDate && value.name.toLowerCase().includes(wordEntered.toLowerCase());
                            }
                        }).map( modelo => {
                            return(
                                <div key={modelo["_id"]["$oid"]} className='bg-[#F3F6FF] rounded-t-xl rounded-b-xl pb-2 w-2/3'>
                                    <div className="flex flex-row p-4 w-full">
                                        <Link to={modelo["_id"]["$oid"]} className="w-3/4">
                                            <p className='text-black font-bold text-left text-xl'>{modelo.name}</p>
                                            <p className='text-black font-normal text-left text-l'>Fecha de ejecución: {moment(modelo["fecha"]["$date"]).locale("es").format("DD-MMMM-YYYY")}</p>
                                        </Link>
                                        <div className="flex w-1/4 justify-end">
                                            <div className= "my-auto mr-4 cursor-pointer" onClick={handleSelectModeloToDelete(modelo["_id"]["$oid"]) }>
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
                                Al eliminar el modelo se borrarán las gráficas generadas en él. ¿Deseas continuar?
                            </h3>
                            <div className="flex flex-row justify-evenly mt-4">
                                <button onClick={deleteModelo} className="bg-[#f25c29] text-white font-bold py-2 px-4 rounded">
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