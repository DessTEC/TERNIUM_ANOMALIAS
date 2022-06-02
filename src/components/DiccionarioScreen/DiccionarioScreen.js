import "../TablaScreen/TablaScreen.css"
import Tabla from '../tabla/Tabla'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";

export const DiccionarioScreen = () => {

    const [, , , diccionario, actInt, actExt] = useOutletContext();

    const getTitle = (variable) => {
        if(actInt.includes(variable)){
            return `${variable} - Actor Interno`
        }else{
            return `${variable} - Actor Externo`
        }
    }

    return(
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
    );
}
