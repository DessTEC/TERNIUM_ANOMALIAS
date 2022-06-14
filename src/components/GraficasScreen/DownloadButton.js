import React from "react"

export default function DownloadButton(props) {

    const handleDownload = () => {
        if(props.selectCharts.length > 0){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date+' '+time;
            const PDFFileName = props.nombreModelo === "" ? "unnamed_" + dateTime : props.nombreModelo + "_" + dateTime;
            props.exportMultipleChartsToPdf(props.selectCharts, PDFFileName)
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