import React from "react";
import { BarChart } from "./BarChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import ChartFilterPopMenu from "../chartFilterMenu/chartFilterPopMenu";
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { BubbleChart } from "./BubbleChart";
import { data } from "autoprefixer";
import { DonaChart } from "./DonaChart";

export const ChartWrapper = ({ chartId, chartData, options, type, setSelectCharts, analysisType, atributos, dataModelo, setCharts, charts, minValAnomalias, maxValAnomalias, varX, varY, valY, minDate, maxDate, calendarMin, calendarMax }) => {
    //console.log(analysisType)
    const [isOpen, setIsOpen] = React.useState(false);

    const [isChecked, setIsChecked] = useState(false);

    function toggle(){
        setIsOpen(isOpen => !isOpen);
    }

    const [modal, setModal] = useState(false)

    const handleZoom = () => setModal(!modal)

    const handleClose =()=> setModal(!modal)

    const handleCheck = () => {
        setIsChecked(!isChecked);
    }

    useEffect(() => {
        if(isChecked){
            setSelectCharts(prevIds => [...prevIds, chartId]);
        }else{
            setSelectCharts(prevIds => prevIds.filter( (id) => {
                return id !== chartId;
            }));
        }
    }, [isChecked]);

    return(
        <div className="w-full p-4 flex flex-row">
            <div className="form-check">
                <input 
                    className="accent-[#1D2533] bg-gray-50 border-gray-300 focus:ring-3 focus:ring-[#1D2533] h-4 w-4 rounded" 
                    type="checkbox"
                    onClick={handleCheck}
                />
            </div>
            <div className="w-full h-80" id={chartId}>
                {
                    type === 'burbuja' ? 
                    <BubbleChart options = {options} chartData={chartData} />
                    : type === 'barras' ?
                    <BarChart options = {options} chartData={chartData} />
                    : 
                    <DonaChart options = {options} chartData={chartData} />
                }
            </div>
                    
            <div className="w-8">
                <div className="flex flex-column justify-content-start">
                    <ChartFilterPopMenu atributos={atributos} analysisType={analysisType} chartType={type} dataModelo={dataModelo} setCharts = {setCharts} id={chartId} charts={charts} minValAnomalias={minValAnomalias} maxValAnomalias={maxValAnomalias} varX={varX} varY={varY} valY={valY} minDate={minDate} maxDate={maxDate} calendarMin={calendarMin} calendarMax={calendarMax}/>
                    <button className="w-full mb-2 rounded-t-md rounded-b-md border border-gray-200 shadow-md bg-[#F5F5F5]" onClick={handleZoom}><FontAwesomeIcon icon={faMagnifyingGlass} className="color-black w-4/6"/></button>
                </div>
            </div>


            <div className={!modal ? 'hidden' : "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full bg-[#1D2533]/30"}>
                <div className="relative p-4 w-full max-w-7xl h-full mx-auto md:h-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex flex-row justify-between items-center p-3 rounded-t border-b">
                            <h3 className="text-xl font-medium text-gray-900">
                                Gráfica expandida
                            </h3>
                            <button onClick={handleClose} className="bg-slate-50 hover:bg-slate-300 rounded-lg p-1.5 ml-auto inline-flex items-center text-gray-400 hover:text-gray-900">
                                <FontAwesomeIcon icon={faXmark} className='w-5' />
                            </button>
                        </div>

                        <div class="p-6 space-y-6">
                        {
                            type === 'burbuja' ? 
                            <BubbleChart options = {options} chartData={chartData} />
                            : type === 'barras' ?
                            <BarChart options = {options} chartData={chartData} />
                            : 
                            <DonaChart options = {options} chartData={chartData} />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }