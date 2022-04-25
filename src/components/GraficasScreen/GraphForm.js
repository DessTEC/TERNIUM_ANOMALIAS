import React from "react";
import arrow from "../../assets/chevron-down.png";

export default function GraphForm(props) {
  return (
    <div className="pb-4">
      <p className="font-normal text-xs text-gray-800 pb-2">{props.text}</p>
      <div class="flex relative w-56">
        <select className="appearance-none w-full bg-white border border-gray-800 text-md text-gray-500 px-2.5 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline">
          <option>Planta Transportista 1</option>
          <option>Planta Transportista 2</option>
          <option>Planta Transportista 3</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <img className="h-5" src={arrow} alt="arrow" />
        </div>
      </div>
    </div>
  );
}
