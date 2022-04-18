import { Atributos } from "../../data/Data";
import { Data } from "../../data/Data";
import "./Tabla.css"

const Tabla = (props) => {
    const hasCheckboxes = props.hasCheckboxes;
    return(
        <div class="table-responsive">
            <table class="table">
            <thead>
                {Atributos.map(header =>
                            <Header hasCheckboxes={hasCheckboxes} data={header}/>
                    )}
            </thead>
            <tbody>
                {Data.map(row => <Row row = {row}/>)}
            </tbody>
            </table>
        </div>
    );
}

const Header = (props) => {
    const hasCheckboxes = props.hasCheckboxes;
    const data = props.data;
    return(
        <th>
            <div className="header">
                <p>{data}</p>
                {hasCheckboxes ? <input type="checkbox"/> : <></>}
            </div>
        </th>
    );
    
}

const Row = (props) => {
    var row = props.row;
    return(
        <tr> {row.map(cell => <td>{cell}</td>)} </tr>
    );
}

export default Tabla;
