
export const createArrayBurbuja = (data, varXInterest, varYInterest) => {

    //Las llaves serán concatenación del valor de varX con valor de varY
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
        
        const llaveElem = `${varXInterest}:${valueX.toString()},${varYInterest}:${valueY.toString()}`;

        if(objElem["anomaly"] === -1){
            valuesOfVar[llaveElem]["anomalias"]+=1;
        }else{
            valuesOfVar[llaveElem]["normales"]+=1;
        }
    }

    let dataAnomalias = []
    let dataNormales = []

    Object.keys(valuesOfVar).map(function(key, index) {
        dataAnomalias.push({
            x: valuesOfVar[key]["valueX"],
            y: valuesOfVar[key]["valueY"],
            r: valuesOfVar[key]["anomalias"]
        })

        dataNormales.push({
            x: valuesOfVar[key]["valueX"],
            y: valuesOfVar[key]["valueY"],
            r: valuesOfVar[key]["normales"]
        })
    });

    const dataForChart = {
        "anomalias": dataAnomalias,
        "normales": dataNormales
    }

    return dataForChart;
}