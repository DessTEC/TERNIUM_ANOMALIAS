import "./Relacionar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const Buscar = () =>{

    return(
        <div className="buscar">
            <div className="input-group rounded">
                <input type="search" className="form-control rounded" placeholder="Buscar" aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <button>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </span>
            </div>
        </div>
    )
}