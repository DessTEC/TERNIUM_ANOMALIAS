import { createArrayBarrasAnom } from "../utils/createArrayBarrasAnom";
import { createArrayBarrasCorrPun } from "../utils/createArrayBarrasCorrPun";
import { createArrayBurbuja } from "../utils/createArrayBurbuja";
import { createArrayDonaAnom } from "../utils/createArrayDonaAnom";
import { getValuesOfVar } from "../utils/getValuesOfVar";
import { createArrayDonaCorrPun } from "../utils/createArrayDonaCorrPun";
import { createArrayDonaCorrGen } from "../utils/createArrayDonaCorrGen";
import { createArrayBarrasCorrGen } from "../utils/createArrayBarrasCorrGen";

//analysisType, chartType, varX, varY, valueY, minValAnomalias, maxValAnomalias, updateCharts
export function createArrayForChart(dataModelo, analysisType, chartType, varX, varY, valueY, minValAnomalias, maxValAnomalias, minValDate, maxValDate){
    let arrayForChart;
    //console.log(minValDate);
    //console.log(maxValDate);
    //Crear información según tipo de gráfica y tipo de análisis
    if(analysisType === 'Anomalías'){
        if(chartType === "barras"){
          arrayForChart = createArrayBarrasAnom(dataModelo, varX, minValAnomalias, maxValAnomalias, minValDate, maxValDate);
        }
        if(chartType === "dona"){
          arrayForChart = createArrayDonaAnom(dataModelo, varX, minValAnomalias, maxValAnomalias, minValDate, maxValDate);
        }
      }else if(analysisType === "Correlación Puntual"){
        if(chartType === "barras"){
          arrayForChart = createArrayBarrasCorrPun(dataModelo, varX, varY, valueY, minValAnomalias, maxValAnomalias, minValDate, maxValDate);
        }
        if(chartType === "dona"){
          arrayForChart = createArrayDonaCorrPun(dataModelo, varX, varY, valueY, minValAnomalias, maxValAnomalias, minValDate, maxValDate);
        }
      }else{
        if(chartType === "barras"){
          arrayForChart = createArrayBarrasCorrGen(dataModelo, varX, varY, minValAnomalias, maxValAnomalias, minValDate, maxValDate);
        }
        if(chartType === "dona"){
          arrayForChart = createArrayDonaCorrGen(dataModelo, varX, varY, minValAnomalias, maxValAnomalias, minValDate, maxValDate);
        }
        if(chartType === "burbuja"){
          arrayForChart = createArrayBurbuja(dataModelo, varX, varY, minValAnomalias, maxValAnomalias, minValDate, maxValDate);
        }     
      }
    return arrayForChart;
}

export function createConf(conf, analysisType, chartType, varX, varY, valueY){
    if(chartType === "barras"){

      conf["scales"]["x"]["title"]["text"] = varX;
      conf["scales"]["y"]["title"]["text"] = "Total de datos";

      if(analysisType === "Correlación General"){
        conf["scales"]["y"]["title"]["text"] = varY;
      }else if(analysisType === "Correlación Puntual"){
        conf["scales"]["y"]["title"]["text"] = `${varY}:${valueY}`;
      }

    }else if(chartType === "burbuja"){
      conf["scales"]["x"]["title"]["text"] = varX;
      conf["scales"]["y"]["title"]["text"] = varY;
    }


      return conf;
};

