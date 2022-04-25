import React from "react";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//{props.expandable} ? <FontAwesomeIcon icon={faAngleDown} className="absolute right-2" /> : <></>

export default function DropDownMenuOption(props){
    
    let arrowIcon = props.isOpen ? faAngleDown : faAngleRight

    return(
    <div>
        <FontAwesomeIcon icon={props.iconLeft} className="w-4 h-4 mr-2 -ml-1" />
        {props.textDisplay}        
        {props.expandable ? <FontAwesomeIcon icon={arrowIcon} className="w-4 h-4 mr-2 -ml-1 absolute right-2" /> : <></>}
    </div>
    )
}