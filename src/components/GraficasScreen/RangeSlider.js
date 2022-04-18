import { useState, useEffect, useRef } from "react";

export default function RangeSlider({ initialMin, initialMax, min, max, step, cap}) {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e) => {
    if (maxValue - minValue >= cap && maxValue <= max){
      if(parseInt(e.target.value) > parseInt(maxValue)){
      } else{
        setMinValue(parseInt(e.target.value));
      }
    } else{
      if(parseInt(e.target.value) < minValue){
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if((maxValue - minValue >= cap) && maxValue <= max){
      if(parseInt(e.target.value) < parseInt(maxValue)){
      }else{
        setMaxValue(parseInt(e.target.value));
      }
    }else{
      if(parseInt(e.target.value) > minValue){
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(()=>{
    progressRef.current.style.left = (minValue / max) * step + "%";
    progressRef.current.style.left = step - (maxValue / max) * step + "%";
  },[minValue, maxValue]);

  return (
    <div className="mb-4">
      <div className="slider relative h-1 rounded-md bg-gray-300">
        <div className="progress absolute h-1 bg-green-300 rounded" ref={progressRef}></div>
      </div>

      <div className="range-input relative">
        <input
          onChange={handleMin}
          type="range"
          value={minValue}
          min={min}
          step={step}
          max={max}
          className="range-min absolute w-full-top-1 h-1 bg-trasnparent appearance-none pointer-events-none"
        />
        <input
          onChange={handleMax}
          type="range"
          value={maxValue}
          min={min}
          step={step}
          max={max}
          className="range-min absolute w-full-top-1 h-1 bg-trasnparent appearance-none pointer-events-none"
        />
      </div>
    </div>
  );
}
