import { NavLink } from 'react-router-dom';
import './TabBar.css';

export const TabBar = () => {

    return (
        <div className='tabBar'>
            <NavLink 
                className = { ({isActive}) => "btn-tab" + (isActive ? ' active-tab': '')}
                to="/consultar/tabla"
            >
                Tabla
            </NavLink>

            <NavLink 
                className = { ({isActive}) => "btn-tab" + (isActive ? ' active-tab': '')}
                to="/consultar/graficas"
            >
                Gráficas
            </NavLink>
        </div>
    )
}