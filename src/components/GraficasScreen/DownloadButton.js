import React from "react"

export default function DownloadButton(props) {

    const handleDownload = () => {
        if(props.selectCharts.length > 0){
            props.exportMultipleChartsToPdf(props.selectCharts)
        }
    }

    return(
        <button className={
            props.selectCharts.length > 0 ? "px-8 mr-8 font-medium border-2 rounded-md border-[#F25C29] text-[#F25C29]" : "px-8 mr-8 font-medium border-2 rounded-md border-gray-300 text-gray-400"}
            onClick={ handleDownload }
        >
            {props.selectCharts.length > 0 ? `Descargar(${props.selectCharts.length})`: 'Descargar' }
        </button>
    )
}