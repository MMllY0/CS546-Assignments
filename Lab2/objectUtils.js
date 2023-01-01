/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
    // check if input are valid or not
    let objs = [obj1, obj2]; 
    for (let obj of objs){
        if (typeof obj != 'object'){
            throw `input type must be object`;
        }
        if (obj instanceof Array){
            throw `Input cannot be array.`
        }
    }

    // recursion to check the deep equality
    function recursion (obj1, obj2) {
        let key1 = Object.getOwnPropertyNames(obj1);
        let key2 = Object.getOwnPropertyNames(obj2);
        if (key1.length == key2.length) {
            for (let key of key1) {
                let val1 = obj1[key];
                let val2 = obj2[key];
                if (val1 instanceof Array) {
                    for (let i=0; i<val1.length; i++) {
                        if (typeof val1 != typeof val2) {
                            return false;
                        } else if (typeof val1[i] == 'object' && (val1 instanceof Array)==false) {
                            recursion(val1[i], val2[i]);
                        } else if (val1[i] !== val2[i]) {
                            return false;
                        } else {
                            return true;
                        }
                    } 
                } else if (typeof val1 == 'object' && (val1 instanceof Array)==false) {
                    recursion(val1, val2);
                } else if (val1 !== val2) {
                    return false;
                } else {

                }
            }
        } else {
            return false;
        }
    return true;
    }

    return recursion(obj1, obj2);
};

let commonKeysValues = (obj1, obj2) => {

    // check if object input is valid
    let objs = [obj1, obj2]; 
    for (let obj of objs){
        if (typeof obj != 'object'){
            throw `input type must be object`;
        }
        if (obj instanceof Array){
            throw `Input cannot be array.`
        }
    }
      
    // recursion function
    // get all the nested objects in a list
    // within a format of [{"key": key1, "val"：val1, "original": [key1, val1]}, ...etc]
    function recursion (obj, output) {
        for (let key in obj) {
            let val = obj[key];
            let subObj = {"key": key, "val":JSON.stringify(val), "original": [key, val]};
            output.push(subObj);
            if ((val instanceof Array)==false && typeof val == 'object') {
                recursion(val, output);
            }
        }
        return output;
    }

    // use recursion func to generate lists
    let out1 = recursion(obj1, []);
    let out2 = recursion(obj2, []);

    // check equal
    function checkEqual (input1, input2) {
        let status = true;
        let type1 = typeof input1; 
        let type2 = typeof input2;
        if (type1 == type2 && type2 == 'object' && (type2 instanceof Array) == false) {
            let key1 = Object.getOwnPropertyNames(input1);
            let key2 = Object.getOwnPropertyNames(input2);
            if (key1.length == key2.length) {
                for (let key of key1) {
                    let val1 = input1[key];
                    let val2 = input2[key];
                    if (val1 instanceof Array) {
                        for (let i=0; i<val1.length; i++) {
                            if (typeof val1 != typeof val2) {
                                return false;
                            } else if (typeof val1[i] == typeof val2[i] && typeof val2[i] == 'object' && (val1[i] instanceof Array) == 'false') {
                                checkEqual(val1[i], val2[i]);
                            } else if (val1[i] !== val2[i]) {
                                return false;
                            }
                        } 
                    } else if (typeof val1 == 'object' && (val1 instanceof Array) == 'false') {
                        checkEqual(val1, val2);
                    } else if (typeof val1 != 'object' && val1!== val2) {
                        return false;
                    } else {
                        return true;
                    }
                }
            } else {
                return false;
            }
    
        } else if (input1 instanceof Array && input2 instanceof Array) {
            for (let i=0; i<val1.length; i++) {
                console.log(val1[i]);
                if (typeof val1 != typeof val2) {
                    return false;
                } else if (typeof val1[i] == typeof val2[i] && typeof val2[i] == 'object' && (val1[i] instanceof Array) == 'false') {
                    checkEqual(val1[i], val2[i]);
                } else if (val1[i] !== val2[i]) {
                    return false;
                }
            }
        } else if (input1 !== input2) {
            return false;
        }
        return true;
    }
    
    // compare two lists and return the common key&val
    let result = {};
    for (let data1 of out1) {
        let val1 = data1['original'][1];
        console.log(typeof val1);
        for (let data2 of out2) {
            let val2 = data2['original'][1];
            if (data1['key'] == data2['key'] && checkEqual(val1, val2)) {
                result[data1['original'][0]] = data1['original'][1];
            }
        }
    }
    return result; 
};

let calculateObject = (object, func) => {
    // check if input are valid
      if (typeof object != 'object' || (object instanceof Array)){
          throw `Input ${object} must be an object`
      }
      if (typeof func != 'function') {
          throw `Second input ${func} must be an function`
      }
      if (Object.getOwnPropertyNames(object).length == 0){
          throw `Object is empty`;
      }
      for (let key in object) {
          if (typeof object[key] != 'number'){
              throw `${object[key]} is not a number`
          }
      }
      
      // the number will be squarerooted must be greater than 0
      let output = {};
      for (let key in object) {
          if (typeof func(object[key]) == "number" && func(object[key]) >= 0){
              let num = Math.sqrt(func(object[key])).toFixed(2);
              output[key] = Number(num);
          } else if (typeof func(object[key]) != "number"){
              throw `The output from func must be a number.`;
          }else if (typeof func(object[key]) == "number" && func(object[key]) < 0) {
              throw `The Output from the func must be greater than zero`;
          }
      }
      return output;
  };

module.exports = {
    deepEquality,
    commonKeysValues,
    calculateObject
}

console.log(deepEquality({b:2, a:2, c:{d:[1,2,3]}}, {a:2, c:{d:[3,2,1]}, b:2}));