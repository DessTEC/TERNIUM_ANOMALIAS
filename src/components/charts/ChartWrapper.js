import React from "react";
import { BarChart } from "./BarChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import ChartFilterPopMenu from "../chartFilterMenu/ChartFilterPopMenu";

import "./Wrapper.css";

export const ChartWrapper = ({ chartData, options }) => {

    const [isOpen, setIsOpen] = React.useState(false);

    function toggle(){
        setIsOpen(isOpen => !isOpen);
    }
    return(
        <div className="w-full p-4 flex flex-row">
            <div className="form-check">
                <input className="accent-[#1D2533] bg-gray-50 border-gray-300 focus:ring-3 focus:ring-[#1D2533] h-4 w-4 rounded" type="checkbox"/>
            </div>
            <div className="w-full h-full">
                <BarChart options = {options} chartData={chartData} />
            </div>
            <div className="button-control-col">
                <div className="btn-panel">
                    <button className="btn-control" onClick={toggle}>
                        <FontAwesomeIcon icon={faEllipsisVertical} className="btn-control-icon" />
                    </button>
                    <div>
                        {isOpen && (<ChartFilterPopMenu closeClick={toggle}/>)}
                    </div>
                    <button className="btn-control">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="btn-control-icon" />
                    </button>
                    
                </div>
            </div>
        </div>
    );
  }