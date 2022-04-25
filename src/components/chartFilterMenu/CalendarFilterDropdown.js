import React from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import './CalendarStyles.css'


export default function CalendarFilterDropdown(props){
    return(
        <div className ="subMenu">
            <div className ="subMenu--list">
                <div className ="w-60 inline-block pt-3 pb-3 pr-2">
                    <ul className="flex justify-around">
                        <li className="pb-2">
                            <p className="calendar--label">Inicio</p>
                            <div className="dateSelector">
                                <input type="date" id="startDate" name="startDate"></input>
                            </div>
                        </li>
                        <li>
                            <p className="calendar--label">Final</p>
                            <div className="dateSelector">
                                <input type="date" id="endDate" name="endDate"></input>
                            </div>
                        </li>    
                    </ul>
                    <div>
                        <Calendar minDetail="month"/>
                    </div>
                </div>
            </div>
        </div>
    )
}