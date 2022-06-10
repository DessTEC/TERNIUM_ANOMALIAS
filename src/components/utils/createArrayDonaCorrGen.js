import isDateInRange from '../utils/dateInRange'

export const createArrayDonaCorrGen = (data, varXInterest, varYInterest, minVal, maxVal, minDate, maxDate) => {

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
            }
        }
    }

    let countAnomArray = []

    Object.keys(valuesOfVar).map(function(key, index) {
        countAnomArray.push({
            value: `x:${valuesOfVar[key]["valueX"]} y:${valuesOfVar[key]["valueY"]}`,
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