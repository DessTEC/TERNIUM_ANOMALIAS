import React from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import './CalendarStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    console.log(date);
    return date;
}

Date.prototype.subtractDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
}

export default function CalendarFilterDropdown({initDate, endDate, setInitDate, setEndDate, inputValueStart, inputValueEnd, setInputValueStart, setInputValueEnd, minCalendarVal, maxCalendarVal}){
    //setInputValueStart(getFormatedDate(inputValueStart));
    //setInputValueEnd(getFormatedDate(inputValueEnd));

    const [selectedStart, setSelectedStart] = React.useState(false);
    const [selectedEnd, setSelectedEnd] = React.useState(false);

    //const [inputValueStart, setInputValueStart] = React.useState('');
    //const [inputValueEnd, setInputValueEnd] = React.useState('');

    //const [initDate, setInitDate] = React.useState(null);

    function onChangeStart(nextValue) {
        setInitDate(nextValue);
        setInputValueStart(getFormatedDate(nextValue));
    }

    //const [endDate, setEndDate] = React.useState(null);

    function onChangeEnd(nextValue) {
        nextValue.setHours(23, 59, 59, 999);
        setEndDate(nextValue);
        setInputValueEnd(getFormatedDate(nextValue));
    }

    function selectDates(nextValue){
        if (!selectedStart) {
            onChangeStart(nextValue);
            setSelectedStart(true);
        }else if(!selectedEnd){
            if(nextValue < initDate){
                onChangeEnd(initDate);
                onChangeStart(nextValue);
            }else{
                onChangeEnd(nextValue);
            }
            setSelectedEnd(true);
        }else{
            setSelectedEnd(false);
            onChangeStart(nextValue);
            onChangeEnd(nextValue);
        }
        /*console.log(initDate.getFullYear().toString() +"-"+ initDate.getMonth().toString()+"-"+initDate.getDate().toString());*/
    }

    function getFormatedDate(oldDate){
        let newDate = "";
        newDate+=oldDate.getFullYear()+"-";

        if(oldDate.getMonth() < 10){
            newDate+="0";
        }
        newDate+=oldDate.getMonth()+1+"-";

        if(oldDate.getDate() < 10){
            newDate+="0";
        }
        newDate+=oldDate.getDate();
        return newDate;
    }

    const handleStartDateChange = (e) => {
        setInputValueStart(e.target.value);
        
    }

    const handleEndDateChange = (e) => {
        setInputValueEnd(e.target.value);
        
    }

    const handleKeyUpStart = (event) => {
        if (event.key === 'Enter') {
        //console.log('do validate')
        var date = new Date(inputValueStart);
        date.setDate(date.getDate()+1);
            if (!isNaN(date)) {
                setInitDate(date);
            }
        }
    }

    const handleKeyUpEnd = (event) => {
        if (event.key === 'Enter') {
        //console.log('do validate')
        var date = new Date(inputValueEnd);
        date.setDate(date.getDate()+1);
            if (!isNaN(date)) {
                setEndDate(date);
            }
        }
    }

    function resetDates() {
        setInitDate(null);
        setEndDate(null);
        setInputValueStart('');
        setInputValueEnd('');
    }
   
    return(
        <div className ="subMenu">
            <div className ="subMenu--list">
                <div className ="w-60 inline-block pt-3 pb-3 pr-2">
                    <ul className="flex justify-around">
                        <li className="pb-2">
                            <p className="calendar--label">Inicio</p>
                            <div className="dateSelector">
                                <input type="date" id="startDate" name="startDate" value={inputValueStart} onChange={handleStartDateChange} onKeyUp={handleKeyUpStart}></input>
                            </div>
                        </li>
                        <li>
                            <p className="calendar--label">Final</p>
                            <div className="dateSelector">
                                <input type="date" id="endDate" name="endDate" value={inputValueEnd} onChange={handleEndDateChange} onKeyUp={handleKeyUpEnd}></input>
                            </div>
                        </li>    
                    </ul>
                    {
                        (maxCalendarVal != null || minCalendarVal != null) ?
                        <Calendar defaultActiveStartDate={new Date(minCalendarVal["$date"])} minDetail="month" onChange={selectDates} value={[initDate,endDate]} minDate={new Date(minCalendarVal["$date"]).subtractDays(1)} maxDate={new Date(maxCalendarVal["$date"]).addDays(1)} />
                        :
                        <Calendar minDetail="month" onChange={selectDates} value={[initDate,endDate]} />
                    }
                    <div>
                    </div>
                    <div>
                        <button className="buttonResetDate" onClick={resetDates}>
                            <FontAwesomeIcon icon={faTrashCan} className="pr-2"></FontAwesomeIcon> 
                            Limpiar fechas </button>
                    </div>
                </div>
            </div>
        </div>
    )
}