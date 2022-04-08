import { Link, Outlet, useParams } from "react-router-dom"

export const ModelosCorrida = () => {
    let params = useParams();

    return (
          <div>
            <Link to="modelo">
                {params.nombre} / Modelo1
            </Link>

          </div>
          
    );
};