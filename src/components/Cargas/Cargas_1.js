import lupa from '../../assets/lupa.png'
import './Cargas.css'

export const Cargas_1 = () => {

    return(
    <><div className="">
            <h2 className="titulo"> CARGAR DATOS</h2>
            <p className="titulo"> Confirmar la configuración del archivo</p>
        </div><div className="divrec">
                <div className="divfon">
                    <p> Archivo a cargar</p>
                </div>

                <div className="divfon2">
                    Parametros de analisis
                </div>

                <h2 className="positionlabeltable">Nombre de Archivo:

                </h2>
                <div className="ingresanombre">
                </div>
            </div><div className="circlecarga">
                <img src={lupa} alt="sample"/>
                </div>
                </> 

    )
}