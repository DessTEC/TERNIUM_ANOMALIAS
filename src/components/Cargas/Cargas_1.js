import lupa from '../../assets/lupa.png'
import './Cargas.css'

export const Cargas_1 = () => {

    return(
        <><div className="">
        <h2 className="titulo"> CARGAR DATOS</h2>
        <p className="titulo"> Confirmar la configuración del archivo</p>
    </div><div className="divrec">
            <div className="divfon">
            <p align = "right"> 
            <p align = "left"> Archivo a cargar </p>
                <button className='botonedit'> Edit</button>
                </p>
                
            </div>

            <div className="divfon2">
            <p align = "right"> 
            <p align = "left"> Parametros de analisis </p>
                <button className='botonedit'> Edit</button>
                </p>
            </div>

            <h2 className="positionlabeltable">Nombre de Archivo:

            </h2>
            <div className="ingresanombre">
              <input className='textbox'></input>
            </div>
        </div><div >
            
            <button className='circlecarga'>
            <img src={lupa} alt="sample"/>
            </button>
            </div>
            </> 

    )
}