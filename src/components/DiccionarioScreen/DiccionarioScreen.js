import "../TablaScreen/TablaScreen.css"
import Tabla from '../tabla/Tabla'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSVLink } from "react-csv";
import { faFileArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const DiccionarioScreen = () => {

    const [, , nombreModelo, diccionario, actInt, actExt] = useOutletContext();
    var [csvData,setCsvData] = useState([[]]);

    const getTitle = (variable) => {
        if(actInt.includes(variable)){
            return `${variable} - Actor Interno`
        }else{
            return `${variable} - Actor Externo`
        }
    }

    const getCsvData = () => {
        const csvDataTemp = [[]]
        const n_columns = Object.keys(diccionario).length * 3
        Object.entries(diccionario).map(([key, dict], i) => {
            csvDataTemp[0].push("val_"+key)
            csvDataTemp[0].push(key)
            csvDataTemp[0].push('')
            Object.entries(dict).map( ([keyValor,valor], j) => {
                var actualIndex = j+1
                if(actualIndex >= csvDataTemp.length){
                    csvDataTemp.push(Array(n_columns).fill(''))
                }
                csvDataTemp[actualIndex][i*3] = keyValor
                csvDataTemp[actualIndex][i*3 + 1] = valor
            }
            )
        }
        )
        setCsvData(csvDataTemp)
    }

    useEffect(() => {
        getCsvData()
    }, [])
    

    return(
        <div>
            <CSVLink className="btn btn-outline-danger botonInline" data={csvData} filename={nombreModelo}>
                    <FontAwesomeIcon icon={faFileArrowDown} className="buttonIcon"/>
                    Descargar
            </CSVLink>
            <div className='grid grid-cols-3 gap-2 mt-3'>
                {
                    Object.entries(diccionario).map(([key, dict], i) => 
                        <div className="tablaDict">
                            <h5>{getTitle(key)}</h5>
                            <div className="table-container">
                                <table className="table">
                                    <thead className="table-responsive">
                                        <tr>
                                            <th>
                                                <p>Valor</p>
                                            </th>
                                            <th>
                                                <p>Traducción</p>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Object.entries(dict).map( ([keyValor,valor], i) => 
                                                <tr>
                                                    <td>{keyValor}</td>
                                                    <td>{valor}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    );
}
