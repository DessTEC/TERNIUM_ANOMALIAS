import React from "react";
import { useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FiltroFecha(props) {
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
    function toggleFilter() {
        setIsOpenOption(isOpenOption => !isOpenOption);
    }

    return (
        <div>
            <button className="btn btn-primary bg-[#F25C29] border-0 hover:bg-[#D15226]" onClick={toggleFilter}>
                <FontAwesomeIcon icon={props.icon} className="buttonIcon" />
                {props.text}
            </button>
            {props.expandable && isOpenOption && props.subMenu}
        </div>
    )
}