import React from "react";
import Calendar from "react-calendar/dist/umd/Calendar";
import './CalendarStyles.css'


export default function CalendarFilterDropdown(props){

    const startDateField = document.getElementsByClassName('startDate');
    const endDateField = document.getElementsByClassName('endDate');

    const [selectedStart, setSelectedStart] = React.useState(false);
    const [selectedEnd, setSelectedEnd] = React.useState(false);

    const [inputValueStart, setInputValueStart] = React.useState('');
    const [inputValueEnd, setInputValueEnd] = React.useState('');

    const [initDate, setInitDate] = React.useState(new Date());

    function onChangeStart(nextValue) {
        setInitDate(nextValue);
        setInputValueStart(getFormatedDate(nextValue));
    }

    const [endDate, setEndDate] = React.useState(new Date());

    function onChangeEnd(nextValue) {
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

        console.log(newDate);
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
        console.log('do validate')
        var date = new Date(inputValueStart);
        date.setDate(date.getDate()+1);
            if (!isNaN(date)) {
                setInitDate(date);
            }
        }
    }

    const handleKeyUpEnd = (event) => {
        if (event.key === 'Enter') {
        console.log('do validate')
        var date = new Date(inputValueEnd);
        date.setDate(date.getDate()+1);
            if (!isNaN(date)) {
                setEndDate(date);
            }
        }
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
                    <div>
                        <Calendar minDetail="month" onChange={selectDates} value={[initDate,endDate]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}