import { Link } from 'react-router-dom';
import logo from '../../assets/terniumLogo.png';
import industria from '../../assets/industria.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const HomeScreen = () => {

    return (
        <div className='w-full'>
            <div className='w-full h-[500px] bg-gray-900/90 absolute'>
              <img className='w-full h-full object-cover ' src={industria} alt="/" />
            </div>

            <div className='w-32 absolute top-10 left-10'>
                <img className='w-full' src={logo} alt="/" />
            </div>
            
            <div className='max-w-[1240px] mx-auto text-white relative mb-10'>
                <div className='grid grid-cols-1 lg:grid-cols-2 relative gap-y-16 px-4 pt-40 justify-items-center'>
                    <Link to={'/dashboard/subir'} className='bg-[#F25C29] rounded-t-xl rounded-b-xl shadow-2xl pb-2 w-5/6 animate__animated animate__fadeInLeft'>
                        <div className='p-8 w-full'>
                            <FontAwesomeIcon icon={faCloudArrowUp} className="w-full h-48 text-white" />
                            <p className='text-white font-bold text-center text-xl pt-10 pb-6'>Subir archivo</p>
                            <p className='text-white font-normal text-center text-xl pt-10'>Sube tus archivos para ser analizados y genera un reporte de anomalías con base en tus datos.</p>
                        </div>
                    </Link>
                    <Link to={'/dashboard/consultar'} className='bg-[#FAAD42] rounded-t-xl rounded-b-xl shadow-2xl pb-2 w-5/6 animate__animated animate__fadeInRight'>
                        <div className='p-8 w-full'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-full h-48 text-white" />
                            <p className='text-white font-bold text-center text-xl pt-10 pb-6'>Consultar</p>
                            <p className='text-white font-normal text-center text-xl pt-10'>Consulta tus resultados y reportes anteriores y descargalos a tu PC.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        );
}