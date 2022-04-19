import barchart1 from "../../assets/bar-chart1.png";
import barchart2 from "../../assets/bar-chart3.png";
import chart1 from "../../assets/chart1.png";


export const ButtonGroupCharts = ({chartType, setChartType}) => {

    const buttons = [
        {
            id: "barrasV",
            image: barchart1,
            text: "Columnas verticales"
        },
        {
            id: "barrasH",
            image: barchart2,
            text: "Columnas horizontales"
        },
        {
            id: "burbuja",
            image: chart1,
            text: "Burbuja"
        }
    ]

    return(
        <>
            {buttons.map((btn) => (
                <button 
                    className={"flex flex-col items-center justify-center px-8 mr-8 h-32 w-32 text-black text-sm font-semibold rounded-2xl" + (btn.id === chartType ? " border-2 border-[#F25C29]" : "")}
                    key={btn.id} 
                    onClick={() => setChartType(btn.id)}
                >
                    <img className="py-1" src={btn.image} alt={btn.text}/>
                    {btn.text}
                </button>
            ))}
        </>
    )
}