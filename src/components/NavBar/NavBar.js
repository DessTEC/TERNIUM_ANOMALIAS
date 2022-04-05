
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

export const Navbar = () => {

    return (
        <nav className="navbar navbar-expand-sm dark-ternium">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                <img src="assets/terniumLogo.png" className='img-nav'/>
            </Link>

            <div className="navbar-collapse justify-content-end nav">

                <div className="justify-content-end navbar-nav">
                    {/* NavLink tiene un objecto con una propiedad isActive, que es bool */}
                    <NavLink 
                        className = { ({isActive}) => "btn-nav" + (isActive ? ' active-nav': '')}
                        to="/consultar/tabla"
                    >
                            <img src="assets/lupa.png" className='img-btn'/>Consultar
                    </NavLink>

                    <NavLink 
                        className = { ({isActive}) => "btn-nav" + (isActive ? ' active-nav': '')}
                        to="/subir"
                    >
                         <img src="assets/cloud.png" className='img-btn'/>Subir archivo
                    </NavLink>

                </div>

                
            </div>

        </nav>
    )
}