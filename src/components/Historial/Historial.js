import { Link } from 'react-router-dom';
import logo from '../../assets/terniumLogo.png';
import industria from '../../assets/industria.png';
import { SearchBar } from '../SearchBar/SearchBar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const Historial = () => {

    const name1 = 'Primer Trimestre';
    const name2 = 'semestre2020';

    return (
          <div>
            <div className='max-w-[1240px] mx-auto text-black relative mb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-1 relative gap-y-10 px-4 pt-20 justify-items-center'>
                    <div className='w-full'>
                        <button className="btn btn-primary bg-[#F25C29] border-0 hover:bg-[#D15226]">
                            <FontAwesomeIcon icon={faFilter} className="buttonIcon pr-2"/>
                            Filtros
                        </button>
                        <p className='text-black font-bold text-center text-xl'>CONSULTAR</p>
                        <p className='text-black font-normal text-center text-xl pb-3'>Navega por los reportes generados anteriormente</p>
                        <SearchBar />
                    </div>
                    <Link to={name1} className='bg-[#F3F6FF] rounded-t-xl rounded-b-xl pb-2 w-2/3'>
                        <div className='p-4 w-full'>
                            <p className='text-black font-bold text-left text-xl'>Datos primer trimestre 2022</p>
                            <p className='text-black font-normal text-left text-l'>5 modelos</p>
                        </div>
                    </Link>
                    <Link to={name2} className='bg-[#F3F6FF] rounded-t-xl rounded-b-xl pb-2 w-2/3'>
                        <div className='p-4 w-full'>
                            <p className='text-black font-bold text-left text-xl'>Datos segundo trimestre 2021</p>
                            <p className='text-black font-normal text-left text-l'>3 modelos</p>
                        </div>
                    </Link>
                    <Link to={name2} className='bg-[#F3F6FF] rounded-t-xl rounded-b-xl pb-2 w-2/3'>
                        <div className='p-4 w-full'>
                            <p className='text-black font-bold text-left text-xl'>Datos primer trimestre 2021</p>
                            <p className='text-black font-normal text-left text-l'>3 modelos</p>
                        </div>
                    </Link>
                </div>
            </div>
          </div>
    );
};