import { Link } from 'react-router-dom';
import './HomeScreen.css';

export const HomeScreen = () => {

    return(
        <>
            <img src="assets/industria.png" max-width="100%" min-width="100%"/>
            <img src="assets/terniumLogo.png" className='logo'/>

            <div className='rowButton'>
                <Link to={'/subir'} className='carta subir'>

                        <div className='thumb'>
                            <img src="assets/cloud.png"/>
                        </div>
                        <div className="contenido">
                            <p className="nombre">Subir archivo</p>
                            <p className="descripcion">Sube tus archivos para ser analizados y genera un reporte de anomalías con base en tus datos.</p>
                        </div>
                </Link>

                <Link to={'/consultar'} className='carta consultar'>
                    <div className='thumb'>
                        <img src="assets/lupa.png"/>
                    </div>
                    <div className="contenido">
                        <p className="nombre">Consultar</p>
                        <p className="descripcion">Consulta tus resultados y reportes anteriores y descargalos a tu PC.</p>
                    </div>
                </Link>
                    
            </div>
        </>
    );
}