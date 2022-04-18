import { useState } from "react";

export default function(props){

    const [isActive, setIsActive] = useState(false)

    const toggleButton=() => {
        setIsActive(!isActive)
    }

    return(
        <button className={"flex flex-col items-center justify-center px-8 mr-8 h-32 w-32 text-black text-sm font-semibold rounded-2xl" + (isActive ? " border-2 border-[#F25C29]" : "")} onClick={toggleButton}>
            <img className="py-1" src={props.graphImg} alt={props.alt}/>
            {props.graphTxt}
        </button>
    )
}