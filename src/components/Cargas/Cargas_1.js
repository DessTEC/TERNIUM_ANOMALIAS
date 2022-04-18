import Cargas from "./Cargas"
import lupa from '../../assets/lupa.png'

const Cargas_1 = () => {

    return(
    <><div class="">
            <h2 class="titulo"> CARGAR DATOS</h2>
            <p class="titulo"> Confirmar la configuración del archivo</p>
        </div><div class="divrec">
                <div class="divfon">
                    <p> Archivo a cargar</p>
                </div>

                <div class="divfon2">
                    Parametros de analisis
                </div>

                <h2 class="positionlabeltable">Nombre de Archivo:

                </h2>
                <div class="ingresanombre">
                </div>
            </div><div class="circlecarga">
                <img src={lupa} alt="sample"/>
                </div>
                </> 

    )
}

export default Cargas_1