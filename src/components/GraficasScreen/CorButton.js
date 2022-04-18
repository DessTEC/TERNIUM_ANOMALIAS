import { useState } from "react";

export default function(props){

    const [isActive, setIsActive] = useState(false)

    const toggleButton=() => {
        setIsActive(!isActive)
    }

    const state1 = "px-4 py-2 mr-8 text-black font-medium border-b-2 border-l-2 border-gray-300 rounded-md" 
    const state2 = "px-4 py-2 mr-8 text-white bg-[#F25C29] font-medium border-b-2 border-l-2 border-gray-300 rounded-md" 

    return(
        <button className={(isActive ?  state2 : state1)} onClick={toggleButton}>
            {props.text}
        </button>
    )
}