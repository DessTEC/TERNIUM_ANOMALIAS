import { createArrayChart } from "../utils/createArrayChart";
import { createArrayCorrelacion } from "../utils/createArrayCorrelacion";
import { createArrayBurbuja } from "../utils/createArrayBurbuja";
import { createArrayDonaAnom } from "../utils/createArrayDonaAnom";
import { getValuesOfVar } from "../utils/getValuesOfVar";
import { createArrayDonaCorr } from "../utils/createArrayDonaCorr";

//analysisType, chartType, varX, varY, valueY, minValAnomalias, maxValAnomalias, updateCharts
export function createArrayForChart(dataModelo, analysisType, chartType, varX, varY, valueY, minValAnomalias, maxValAnomalias){
    let arrayForChart;

    if(analysisType === 'Anomalías'){
        if(chartType === "barras"){
          arrayForChart = createArrayChart(dataModelo, varX, minValAnomalias, maxValAnomalias);
        }
        if(chartType === "dona"){
          arrayForChart = createArrayDonaAnom(dataModelo, varX, minValAnomalias, maxValAnomalias);
        }
      }else{
        if(chartType === "barras"){
          arrayForChart = createArrayCorrelacion(dataModelo, varX, varY, valueY, minValAnomalias, maxValAnomalias);
        }
        if(chartType === "dona"){
          arrayForChart = createArrayDonaCorr(dataModelo, varX, varY, valueY, minValAnomalias, maxValAnomalias);
        }
        if(chartType === "burbuja"){
          arrayForChart = createArrayBurbuja(dataModelo, varX, varY, minValAnomalias, maxValAnomalias);
        }
      }

    return arrayForChart;
}

export function createConf(conf, analysisType, chartType, varX, varY, valueY){
    switch(chartType){
        case "barras":
          conf["scales"]["x"]["title"]["text"] = varX;
          conf["scales"]["y"]["title"]["text"] = "Total de datos";
          break;
        case "burbuja":
          conf["scales"]["x"]["title"]["text"] = varX;
          conf["scales"]["y"]["title"]["text"] = varY;
          break;
        default:
          
      }
  
      if(chartType === "barras" && analysisType === "Correlación"){
        conf["scales"]["y"]["title"]["text"] += `(${varY}:${valueY}))`;
      }

      return conf;
};

