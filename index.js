
function solution(){
    //var D = {'2019-01-01':100,'2019-01-04':115};
    var D = {'2019-01-01':100,'2019-01-04':115};
    var O ={};
    var prev = null;
    var prevVal;
    var count = 0;

    for(var key in D) {
        var value = new Date(key);
        
        if(!prev){
            //first date check null
            prev = new Date(value) ;
            prevVal = D[key];
            //console.log(prevVal);
        }
        else{
            if(value > prev && value != prev){
                //get date difference
                let len = value.getDate() - prev.getDate();
                let curr = new Date(prev);
                var keyInt = null;
                while(len && curr.getDate()!=value.getDate()){
                    if(curr.getDate() != prev.getDate()){
                        keyInt = getVal(prevVal,D[key],len);
                        prevVal=keyInt;
                    }
                    else{
                        keyInt=prevVal;
                        //console.log(keyInt);
                    }
                    //console.log(curr,keyInt);
                    O[curr.getFullYear()+'-'+(curr.getMonth()+1)+'-'+curr.getDate()]= keyInt;
                    //get next date
                    curr.setDate(curr.getDate() + 1);
                    len = len -1;
                }
            }
            O[value.getFullYear()+'-'+(value.getMonth()+1)+'-'+value.getDate()]=D[key];

            //set new previous value
            prev = new Date(value);
            prevVal = D[key];
        }
        
        
      }
      console.log("Input:",D);
      console.log("Output:",O);
    
}

function getVal(prevVal,lastVal,len){
    return (prevVal * (len) +  lastVal)/ (len+1);
}