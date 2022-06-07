export default function isDateInRange(dateString, minDate, maxDate){
        let hasPassed = true;
        if(dateString === "NaN" || dateString === ""){
            if(minDate != null && maxDate != null){
                hasPassed = false;
            }
        }else if(dateString === null || dateString === undefined){
            hasPassed = true;
        }else{
            if(minDate != null && maxDate != null){
                if(minDate < new Date(dateString) && new Date(dateString) < maxDate){
                    hasPassed = true;
                }else{
                    hasPassed = false;
                }
            }else{
                if(minDate == null){
                    if(maxDate < new Date(dateString)){
                        hasPassed *= false;
                    }
                }
                if(maxDate == null){
                    if(minDate < new Date(dateString)){
                        hasPassed *= false;
                    }
                }
                if(minDate == null && maxDate == null){
                    hasPassed = true;
                }
            }
        }
    return hasPassed;
}