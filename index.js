
function solution(D){
    //var D = {'2019-01-01':100,'2019-01-04':115};
    //var D = {'2019-01-01':100,'2019-01-04':115};
    var D = JSON.parse(D.replace(/'/g,"\""));
    var O ={};
    var prev = null;
    var prevVal;

    for(var key in D) {
        var value = new Date(key);
        
        if(!prev){
            //set initial previous value
            prev = new Date(value) ;
            prevVal = D[key];
        }
        else{
            if(value > prev && value != prev){
                //get date difference
                let len = value.getDate() - prev.getDate();
                let curr = new Date(prev);
                var keyInt = null;

                //enter missing dates between two dates
                while(len && curr.getDate()!=value.getDate()){

                    if(curr.getDate() != prev.getDate()){
                        keyInt = getVal(prevVal,D[key],len);
                        prevVal=keyInt;
                    }
                    else{
                        keyInt=prevVal;
                    }

                    let setDate = parseDateStr(curr);
                    O[setDate] = keyInt;
                    
                    //get next date
                    curr.setDate(curr.getDate() + 1);
                    len = len -1;
                }
            }
            //set last date
            let setDate = parseDateStr(value);
            O[setDate] = D[key];

            //set new previous value
            prev = new Date(value);
            prevVal = D[key];
        }
        
        
      }
      console.log("Input:",D);
      console.log("Output:",O);  
      document.getElementById('outputVal').innerHTML = JSON.stringify(O); 
}

function getVal(prevVal,lastVal,len){
    return (prevVal * (len) +  lastVal)/ (len+1);
}

function parseDateStr(date){
    let month,day;

    switch(true){
        case date.getMonth()< 10: month = '0'+(date.getMonth()+1);
            break;
        default: month = date.getMonth()+1;
    };

    switch(true){
        case date.getDate()< 10: day = '0'+date.getDate();
            break;
        default: day = date.getDate();
    };

    return String(date.getFullYear()+'-'+month+'-'+day)
}