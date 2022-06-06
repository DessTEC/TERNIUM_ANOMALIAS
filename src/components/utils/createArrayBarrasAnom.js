
export const createArrayBarrasAnom = (data, varInterest, minVal, maxVal, minDate, maxDate) => {

    let valuesOfVar = {};

    for(let i=0; i < data.length; i++){
        const objElem = data[i];
        let hasPassed = true;
        
        if(minDate != null && maxDate != null){
            if(minDate < new Date(objElem["fecha"]) && new Date(objElem["fecha"]) < maxDate){
                hasPassed = true;
            }else{
                hasPassed = false;
            }
        }else{
            if(minDate == null){
                if(maxDate < new Date(objElem["fecha"])){
                    hasPassed *= false;
                }
            }
            if(maxDate == null){
                if(minDate < new Date(objElem["fecha"])){
                    hasPassed *= false;
                }
            }
            if(minDate == null && maxDate == null){
                hasPassed = true;
            }
        }
        
        if(hasPassed){

            // Sumar 1 a llave existente al campo correspondiente
            if(valuesOfVar.hasOwnProperty(objElem[varInterest])){
                if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                    valuesOfVar[objElem[varInterest]]["anomalias"]++
                }else{
                    valuesOfVar[objElem[varInterest]]["normales"]++
                }            
            }else{ // Instanciar nueva entrada del objeto con nuevo valor de la variable de interés 
                if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                    valuesOfVar[objElem[varInterest]] = {
                        anomalias: 1,
                        normales: 0
                    }
                }else{
                    valuesOfVar[objElem[varInterest]] = {
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