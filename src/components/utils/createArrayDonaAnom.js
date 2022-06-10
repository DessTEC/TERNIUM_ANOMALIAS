import isDateInRange from '../utils/dateInRange'

export const createArrayDonaAnom = (data, varInterest, minVal, maxVal, minDate, maxDate) => {

    let valuesOfVar = {};

    for(let i=0; i < data.length; i++){
        const objElem = data[i];
        let hasPassed = isDateInRange(objElem["fecha"],minDate,maxDate);
        
        if(hasPassed){
            // Sumar 1 a llave existente al campo correspondiente
            if(valuesOfVar.hasOwnProperty(objElem[varInterest])){
                if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                    valuesOfVar[objElem[varInterest]]["anomalias"]++
                }         
            }else{ // Instanciar nueva entrada del objeto con nuevo valor de la variable de interés 
                if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                    valuesOfVar[objElem[varInterest]] = {
                        anomalias: 1
                    }
                }
            }
        }
    }

    let countAnomArray = []

    Object.keys(valuesOfVar).map(function(key, index) {
        countAnomArray.push({
            value: key,
            anomalias: valuesOfVar[key]["anomalias"]
        })
    });

    //Ordenar arreglo dependiendo de las anomalías de los datos de mayor a menor
    countAnomArray.sort(function(a, b) {
        return a["anomalias"] > b["anomalias"] ? -1 : 1;
    });

    //Si hay más de 5 valores, juntar del 5 en adelante bajo el nombre Otros
    if(countAnomArray.length > 5){
        let otrosAnom = 0
        for(let i=4; i < countAnomArray.length; i++){
            otrosAnom+=countAnomArray[i]["anomalias"]
        }
        countAnomArray.splice(4)

        countAnomArray.push({
            value: "Otros",
            anomalias: otrosAnom
        })
    }

    let dataForChart = []
    for(let i=0; i < countAnomArray.length; i++){
        dataForChart.push({
            id: i,
            value: countAnomArray[i]["value"],
            anomalias: countAnomArray[i]["anomalias"]
        })
    }

    return dataForChart;
}