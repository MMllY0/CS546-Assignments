/* Todo: Implement the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {
    if (typeof array == 'undefined'){
      throw `Array does not exist`;
    }
  
    if (array instanceof Array == false){
      throw `This is not an array!`;
    }
  
    if (array.length == 0){
      throw `Array is empty!`;
    }

    if (array.length == 1) {
        throw `Array should have at least 2 elements.`
    }
    
    function checkNumber(num){
      if (typeof num == 'number'){
        return true;
      } else if (isNaN(num)){
        return false; 
      } else{
        return false;
      }
    }
    if (array.every(checkNumber) == false){
      throw `Element must be a number`;
    }
  
    let output = [];
    // sort the array in ascending order
    array.sort(function(a, b){return a-b});
  
    // mean
    function sum(arr){
      var s = 0;
      arr.forEach(function(val, idx,arr){
          s += val
      }, 0);
      return s;
    };
    output['mean'] = Number((sum(array)/array.length).toFixed(2));
  
    // median
    function checkMedian(arr){
      if (arr.length%2 == 0){
        return ((arr[arr.length/2] + arr[arr.length/2 - 1])/2);
      }else{
        return (arr[arr.length/2 - 0.5]);
      }
    }
    output['median'] = checkMedian(array); 
  
    // mode
    function findMode(arr){
        let mode = [];
        let curMode = 0;
        let curMax = 0;
        let hash = {};
        for (let num of arr){
            if (hash[num]){
                hash[num]++;
            } else{
                hash[num] = 1;
            }
            if (hash[num]>curMax){
                curMax = hash[num];
                curMode = num;
            }
        }
        // Check if the occurrence of all mode is the same.
        val0 = hash[array[0]];
        let checkEqual = true;
        for (let key in hash) {
            if (hash[key] != val0) {
                checkEqual = false;
                mode = 0;
            }
        }
        if (checkEqual = true){
             return curMode = 0;
        }else{
            for (let key in hash){
                if (hash[key] == curMax){
                    mode.push(key);
                }
            }
            if (mode.length == 1){
                return Number(mode[0]);
            } else{
                return mode;
            }
        }
        
    }
    output['mode'] = findMode(array);
  
    output['minimum'] = array[0];
    // Check if there are any empty values
    let emptyCnt = 0;
    for (let num of array) {
        if (num == undefined){
            emptyCnt++;
        }
    }
    output['maximum'] = array[array.length - 1 - emptyCnt];
    output['range'] = output.maximum - output.minimum;
    output['count'] = array.length;
    output['sum'] = sum(array);
    return output;
  };

let makeObjects = (...arrays) => {
  let arraysLen = arrays.length;
  let myObject = {};

  function checkArray(arr){
      let status = true;
      if (arr instanceof Array == false){
          return status = false;
      } else{
          return status;
      }
  }
  
  for (let i=0;i<arraysLen;i++){
      if (checkArray(arrays[i]) == false){
          throw `Entries must all be an array!`;
      }
      if (arrays[i].length > 2){
          throw `All input must has a length of 2`;
      }
      if (arrays[i].length == 0){
          throw `Input array cannot be empty.`;
      }
      if (arrays[i].length == 1){
        throw `Need one more element.`;
        }


      myObject[arrays[i][0]] = arrays[i][1];
  }

  return myObject;
};

let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  let arraysLen = arrays.length;
  let commonES = [];
  if (arraysLen >=2){
      for (let i=0; i<arraysLen; i++){
          if (arrays[i] instanceof Array == false){
              throw `Input must all be array`;
          }
          if (arrays[i].length == 0){
              throw `Sub-array cannot be empty`;
          }
      }
  } else {
      throw `At least two arrays are required`;
  }

  for (let num0 of arrays[0]){
      for (let num1 of arrays[1]){
          if (JSON.stringify(num0) == JSON.stringify(num1) && commonES.indexOf(num0) === -1){
              commonES.push(num0);
          }
      }
  }

  

  if (arraysLen>2){
      for (let i=2; i<arraysLen; i++){
          for (let j=0; j<commonES.length; j++){
              let checkStatus = true;
              for(let num of arrays[i]){
                  if (JSON.stringify(num) == JSON.stringify(commonES[j])){
                      checkStatus = false;
                  }
              }
              if (checkStatus){
                  commonES.splice(j,1);
              }
          }
      }
  }
  
  let result = commonES;
  
  for (let i=0; i<commonES.length; i++){
      for (let j=i+1; j<commonES.length; j++){
          if (JSON.stringify(commonES[i]) == JSON.stringify(commonES[j])){
              result.splice(j, 1);
          }
      }
  }
  
  return result;

};

module.exports = {
    arrayStats,
    makeObjects,
    commonElements
};

console.log(arrayStats([7, 9, 11, 15, 19, 20, 35, 0]));
console.log(arrayStats([1, 1, 2.5, 5, 10, 10, 15, 15, 20, 20]));