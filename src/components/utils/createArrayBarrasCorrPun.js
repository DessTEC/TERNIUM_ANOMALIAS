
export const createArrayBarrasCorrPun = (data, varXInterest, varYInterest, valueYInterest, minVal, maxVal) => {

    let valuesOfVar = {};

    const valueYInterestInt = parseInt(valueYInterest, 10);

    for(let i=0; i < data.length; i++){
        const objElem = data[i];
        //Checar si en el registro sale el valor solicitado de la variable Y
        if(objElem[varYInterest] === valueYInterestInt){
            // Sumar 1 a llave existente al campo correspondiente
            if(valuesOfVar.hasOwnProperty(objElem[varXInterest])){
                if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                    valuesOfVar[objElem[varXInterest]]["anomalias"]++
                }else{
                    valuesOfVar[objElem[varXInterest]]["normales"]++
                }            
            }else{ // Instanciar nueva entrada del objeto con nuevo valor de la variable de interés 
                if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                    valuesOfVar[objElem[varXInterest]] = {
                        anomalias: 1,
                        normales: 0
                    }
                }else{
                    valuesOfVar[objElem[varXInterest]] = {
                        anomalias: 0,
                        normales: 1
                    }
                }
            }
        }
    }

    let dataForChart = []

    Object.keys(valuesOfVar).map(function(key, index) {
        dataForChart.push({
            id: index,
            value: key,
            normales: valuesOfVar[key]["normales"],
            anomalias: valuesOfVar[key]["anomalias"]
        })
    });

    return dataForChart;
}