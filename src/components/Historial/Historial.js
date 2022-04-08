import { Link, Outlet } from "react-router-dom"

export const Historial = () => {

    const name1 = 'semestre2019';
    const name2 = 'semestre2020';

    return (
          <div>
            <Link to={name1}>
                HOLA 1
            </Link>
            <Link to={name2}>
                HOLA 2
            </Link>
            
          </div>
    );
};