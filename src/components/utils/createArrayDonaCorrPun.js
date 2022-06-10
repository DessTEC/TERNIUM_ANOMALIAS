import isDateInRange from '../utils/dateInRange'

export const createArrayDonaCorrPun = (data, varXInterest, varYInterest, valueYInterest, minVal, maxVal, minDate, maxDate) => {

    let valuesOfVar = {};

    const valueYInterestInt = parseInt(valueYInterest, 10);

    for(let i=0; i < data.length; i++){
        const objElem = data[i];
        let hasPassed = isDateInRange(objElem["fecha"],minDate,maxDate);
        
        if(hasPassed){
            //Checar si en el registro sale el valor solicitado de la variable Y
            if(objElem[varYInterest] === valueYInterestInt){
                // Sumar 1 a llave existente al campo correspondiente
                if(valuesOfVar.hasOwnProperty(objElem[varXInterest])){
                    if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                        valuesOfVar[objElem[varXInterest]]["anomalias"]++
                    }        
                }else{ // Instanciar nueva entrada del objeto con nuevo valor de la variable de interés 
                    if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                        valuesOfVar[objElem[varXInterest]] = {
                            anomalias: 1,
                            normales: 0
                        }
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

    //Eliminar opciones del arreglo con 0 anomalías
    countAnomArray = countAnomArray.filter(elem => elem["anomalias"] > 0)

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