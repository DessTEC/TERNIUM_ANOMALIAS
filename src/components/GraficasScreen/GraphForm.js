import React from "react";
import arrow from "../../assets/chevron-down.png";

export default function GraphForm(props) {
  return (
    <div className="pb-4">
      <h2 className="font-normal text-xs text-gray-600 pb-2">{props.text}</h2>
      <div class="inline-block relative w-56">
        <select class="block appearance-none w-full bg-white border border-gray-800 text-md text-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline">
          <option>Planta Transportista</option>
          <option>Planta Transportista 2</option>
          <option>Planta Transportista 3</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <img className="h-5" src={arrow} alt="arrow" />
        </div>
      </div>
    </div>
  );
}
