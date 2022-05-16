
export const getValuesOfVar = (data, varInterest) => {
    let valuesOfVar = {};

    for(let i=0; i < data.length; i++){
        const objElem = data[i];

        // Sumar 1 a llave existente al campo correspondiente
        if(!valuesOfVar.hasOwnProperty(objElem[varInterest])){
            valuesOfVar[objElem[varInterest]] = 1; //Valor cualquiera, sólo interesan las llaves
        }
    }

    return Object.keys(valuesOfVar);
}