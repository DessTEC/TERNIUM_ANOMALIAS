
export const ButtonGroupCor = ({analysisType, setAnalysisType, chartType}) => {
    const buttons = [
        {
            id: "Anomalías",
        },
        {
            id: "Correlación Puntual",
        },
        {
            id: "Correlación General",
        },
    ]


    const state1 = "px-4 py-2 mr-8 h-14 text-black font-medium border-b-2 border-l-2 border-gray-300 rounded-md" 
    const state2 = "px-4 py-2 mr-8 h-14 text-white bg-[#F25C29] font-medium border-b-2 border-l-2 border-gray-300 rounded-md" 

    return(
        <>
            {
                chartType !== "burbuja" ?
                buttons.map((btn) => (
                    <button 
                        className={(btn.id === analysisType ?  state2 : state1)} 
                        onClick={() => setAnalysisType(btn.id)}
                    >
                        {btn.id}
                    </button>
                ))
                :
                <button 
                    className={(analysisType === "Correlación General" ?  state2 : state1)} 
                    onClick={() => setAnalysisType("Correlación General")}
                >
                    Correlación General
                </button>
            }
        </>
    )
}