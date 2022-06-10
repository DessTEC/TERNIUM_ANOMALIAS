import isDateInRange from '../utils/dateInRange'

export const createArrayBarrasCorrGen = (data, varXInterest, varYInterest, minVal, maxVal, minDate, maxDate) => {

    let valuesOfVar = {};

    //Creación de arreglo de objetos para contabilizar anomalías
    for(let i=0; i < data.length; i++){
        const objElemX = data[i];
        const valueX= objElemX[varXInterest];

        //Checar si en el registro sale la llave de valores combinados
        for(let j=0; j < data.length; j++){
            const objElemY = data[j];
            const valueY= objElemY[varYInterest];

            const llaveComb = `${varXInterest}:${valueX.toString()},${varYInterest}:${valueY.toString()}`;
            if(!valuesOfVar.hasOwnProperty(llaveComb)){
                valuesOfVar[llaveComb] = {
                    anomalias: 0,
                    normales: 0,
                    valueX: valueX,
                    valueY: valueY
                }
            }
        }
    }

    //Buscar a qué combinación de valores de X y Y corresponde el registro y sumar a la anomalía si es el caso
    for(let i=0; i < data.length; i++){
        const objElem = data[i];
        const valueX= objElem[varXInterest];
        const valueY= objElem[varYInterest];
        let hasPassed = isDateInRange(objElem["fecha"],minDate,maxDate);
        if(hasPassed){
            const llaveElem = `${varXInterest}:${valueX.toString()},${varYInterest}:${valueY.toString()}`;

            if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                valuesOfVar[llaveElem]["anomalias"]+=1;
            }else{
                valuesOfVar[llaveElem]["normales"]+=1;
            }
        }
    }

    let dataForChart = []

    Object.keys(valuesOfVar).map(function(key, index) {
        dataForChart.push({
            id: index,
            value: `x:${valuesOfVar[key]["valueX"]} y:${valuesOfVar[key]["valueY"]}`,
            normales: valuesOfVar[key]["normales"],
            anomalias: valuesOfVar[key]["anomalias"]
        })
    });

    return dataForChart;
}