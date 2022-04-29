import React from "react";
import RangeSlider from "../GraficasScreen/RangeSlider";

export default function RangeFilterDropdown(props){
    const [minValAnomalias, setMinValAnomalias] = React.useState(-100);
    const [maxValAnomalias, setMaxValAnomalias] = React.useState(100);

    return(
        <div className ="subMenu">
            <div className ="w-80">
                <ul className="flex justify-between ml-4 mr-4 pt-2">
                    <li className="">
                                <p className="text-[12px]">mínimo</p>
                                
                    </li>
                    <li className="">
                                <p className="text-[12px]">máximo</p>
                                
                    </li>
                </ul>
                <RangeSlider  
                    min={0} max={100} onChange={({ min, max }) => {
                    setMinValAnomalias(min)
                    setMaxValAnomalias(max)
                  }}/>  
            </div>
        </div>
    )
}