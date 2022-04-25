
export const ButtonGroupCor = ({analysisType, setAnalysisType}) => {

    const buttons = [
        {
            id: "Anomalías",
        },
        {
            id: "Correlación",
        },
    ]

    const state1 = "px-4 py-2 mr-8 text-black font-medium border-b-2 border-l-2 border-gray-300 rounded-md" 
    const state2 = "px-4 py-2 mr-8 text-white bg-[#F25C29] font-medium border-b-2 border-l-2 border-gray-300 rounded-md" 

    return(
        <>
            {buttons.map((btn) => (
                <button className={(btn.id === analysisType ?  state2 : state1)} onClick={() => setAnalysisType(btn.id)}>
                    {btn.id}
                </button>
            ))}
        </>
    )
}