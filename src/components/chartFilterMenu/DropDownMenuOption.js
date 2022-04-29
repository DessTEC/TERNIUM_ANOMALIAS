import React from "react";
import { useRef, useEffect } from "react"
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//{props.expandable} ? <FontAwesomeIcon icon={faAngleDown} className="absolute right-2" /> : <></>

export default function DropDownMenuOption(props){



    const [isOpenOption, setIsOpenOption] = React.useState(false);

    const ref = useRef();

  
    const handleClick = () => {
        setIsOpenOption(true);
    };
  
    useEffect(() => {
      const checkClickOutside = (e) => {
        if (isOpenOption && ref.current && !ref.current.contains(e.target)) {
            setIsOpenOption(false);
        }
      };

      document.addEventListener("click", checkClickOutside);
  
      return () => {
        document.removeEventListener("click", checkClickOutside);
      };
    }, [isOpenOption]);

    function toggleFilter(){
        setIsOpenOption(isOpenOption => !isOpenOption);
    }

    let arrowIcon = isOpenOption ? faAngleDown : faAngleRight

    return(
        
    <div ref={ref}>
        <li className="filterMenu--listItem">
        <div className ="filterMenu--option" onClick={toggleFilter}>
            <div>
                <FontAwesomeIcon icon={props.iconLeft} className="w-4 h-4 mr-2 -ml-1" />
                {props.textDisplay}        
                {props.expandable ? <FontAwesomeIcon icon={arrowIcon} className="w-4 h-4 mr-2 -ml-1 absolute right-2" /> : <></>}
            </div>
        </div>
        {props.expandable && isOpenOption && props.subMenu}
        </li>
    </div>
    /*
    <li className="filterMenu--listItem">
        <div className ="filterMenu--option" onClick={props.toggler}>
            <div>
                <FontAwesomeIcon icon={props.iconLeft} className="w-4 h-4 mr-2 -ml-1" />
                {props.textDisplay}        
                {props.expandable ? <FontAwesomeIcon icon={arrowIcon} className="w-4 h-4 mr-2 -ml-1 absolute right-2" /> : <></>}
            </div>
        </div>
        {props.isOn && props.subMenu}
    </li>
    */
    )
}