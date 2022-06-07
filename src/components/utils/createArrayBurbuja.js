import isDateInRange from '../utils/dateInRange'

export const createArrayBurbuja = (data, varXInterest, varYInterest, minVal, maxVal, minDate, maxDate) => {

    let maxX = 0; //Valor máximo que puede tomar la variable X
    let maxY = 0; //Valor máximo que puede tomar la variable Y
    
    let maxBubble = 0;

    //Las llaves serán concatenación del valor de varX con valor de varY
    let valuesOfVar = {};

    //Creación de arreglo de objetos para contabilizar anomalías
    for(let i=0; i < data.length; i++){
        const objElemX = data[i];
        const valueX= objElemX[varXInterest];
        maxX = Math.max(maxX, valueX)
        //Checar si en el registro sale la llave de valores combinados
        for(let j=0; j < data.length; j++){
            const objElemY = data[j];
            const valueY= objElemY[varYInterest];
            maxY = Math.max(maxY, valueY)

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
        let hasPassed =  isDateInRange(objElem["fecha"],minDate,maxDate);
        if(hasPassed){
            const llaveElem = `${varXInterest}:${valueX.toString()},${varYInterest}:${valueY.toString()}`;

            if(objElem["scores"] >= minVal && objElem["scores"] <= maxVal){
                valuesOfVar[llaveElem]["anomalias"]+=1;
            }else{
                valuesOfVar[llaveElem]["normales"]+=1;
            }

            maxBubble = Math.max(maxBubble, valuesOfVar[llaveElem]["anomalias"], valuesOfVar[llaveElem]["normales"])
        }
    }

    let dataAnomalias = []
    let dataNormales = []
    
    let maxRadius = Math.min(maxX, maxY); //Tamaño máximo del radio de la burbuja
    let factNorm = maxRadius / maxBubble; //Factor para normalizar el tamaño de las burbujas a partir del máximo


    Object.keys(valuesOfVar).map(function(key, index) {

        dataAnomalias.push({
            x: valuesOfVar[key]["valueX"],
            y: valuesOfVar[key]["valueY"],
            r: valuesOfVar[key]["anomalias"] * factNorm, //Calcular radio con base en área de círculos
            realR: valuesOfVar[key]["anomalias"]
        })

        dataNormales.push({
            x: valuesOfVar[key]["valueX"],
            y: valuesOfVar[key]["valueY"],
            r: valuesOfVar[key]["normales"] * factNorm,
            realR: valuesOfVar[key]["normales"]
        })
    });

    const dataForChart = {
        "anomalias": dataAnomalias,
        "normales": dataNormales
    }

    return dataForChart;
}