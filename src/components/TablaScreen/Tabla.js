import { Atributos } from "../../data/Data";
import { Data } from "../../data/Data";
import "./Tabla.css"

const Tabla = () => {
    return(
        <div class="table-responsive">
            <table class="table">
            <thead>
                {Atributos.map(header => <th>{header}</th>)}
            </thead>
            <tbody>
                {Data.map(row => <Row row = {row}/>)}
            </tbody>
            </table>
        </div>
    );
}

const Row = (props) => {
    var row = props.row;
    return(
        <tr> {row.map(cell => <td>{cell}</td>)} </tr>
    );
}

export default Tabla;
