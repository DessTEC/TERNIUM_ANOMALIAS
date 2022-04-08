
import { Link } from 'react-router-dom';
import { NavLink } from '../NavLink/NavLink';
import logo from '../../assets/terniumLogo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

export const Navbar = () => {

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)

    return (
        <div className='w-screen h-[80px] z-10 bg-[#1D2533] fixed drop-shadow-lg'>
            <div className='px-2 flex justify-between items-center w-full h-full'>
                <div className='flex items-center'>
                    <Link 
                        className="navbar-brand" 
                        to="/"
                    >
                        <img src={logo} className='w-1/2 ml-2'/>
                    </Link>
                </div>
                <div className='hidden md:flex pr-4'>
                    <NavLink 
                        to="consultar" 
                        className="text-slate-50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                        inactiveClassName="hover:text-slate-900 bg-[#1D2533] border border-white border-solid hover:bg-white"
                        activeClassName="hover:text-slate-50 bg-[#FF3502] border-none hover:bg-[#c62901]"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 mr-2 -ml-1" />
                        Consultar
                    </NavLink>
                    <NavLink 
                        to="subir" 
                        className="text-slate-50 font-medium rounded-3xl text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
                        inactiveClassName="hover:text-slate-900 bg-[#1D2533] border border-white border-solid hover:bg-white"
                        activeClassName="hover:text-slate-50 bg-[#FF3502] border-none hover:bg-[#c62901]"
                    >
                        <FontAwesomeIcon icon={faCloudArrowUp} className="w-4 h-4 mr-2 -ml-1" />
                        Subir
                    </NavLink>
                </div>
                <div className='md:hidden mr-4' onClick={handleClick}>
                        {!nav ? <FontAwesomeIcon icon={faBars} className='w-5 text-slate-50' /> : <FontAwesomeIcon icon={faXmark} className='w-5 text-slate-50' />}
                </div>

                <ul className={!nav ? 'hidden' : 'md:hidden top-20 right-0 absolute bg-white rounded-t-xl rounded-b-xl shadow-2xl w-2/6 px-8 p-0'}>
                    <li className='py-2 border-zinc-300 border-b w-full text-center decoration-none'><NavLink onClick={handleClose} to="consultar" className="text-slate-700" activeClassName="font-bold" inactiveClassName="font-normal">Consultar</NavLink></li>
                    <li className='py-2 border-zinc-300 w-full text-center decoration-none'><NavLink onClick={handleClose} to="subir" className="text-slate-700" activeClassName="font-bold" inactiveClassName="font-normal">Subir</NavLink></li>

                </ul>
            </div>
      </div>
    )
}