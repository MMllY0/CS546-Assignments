/* Todo: Implement the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
      if (typeof string !== 'string'){
          throw `Input must be a string`
      }
      if (typeof string == undefined){
          throw `string does not exist`;
      }
      if (string.trim().length == 0){
          throw `string  is empty`
      }
      
      let result = [];
      string.trim(); //remove spaces at the beginning and end
      let tokens = string.split(' '); //split by space
      tokens = tokens.filter(Boolean); //remove empty ""
      
      for (let i=0; i<tokens.length; i++){
          let checkPunc = tokens[i].split(/\W/).filter(Boolean);
          if (checkPunc.length > 1){
              tokens.splice(i, 1);
          }
      }
  
      let cleaned = [];
      for (let token of tokens) {
          if (token.split(/\W/).length > 1){
              token = token.split(/\W/).filter(Boolean);
              cleaned.push(token[0]);
          }else {
              cleaned.push(token);
          }
      }
  
      for (let token of cleaned){
          let checkStatus = true;
          if (token.length%2 == 1 && token.length>=2) {
              let lower = token.toLowerCase();
              for (let i=0; i<(lower.length/2 - 0.5); i++){
                  if (lower.charAt(i) != lower.charAt(lower.length - i - 1)){
                      checkStatus = false;
                  }
              }
              if (checkStatus){
                  result.push(token);
              }
              
          } else if(token.length%2 == 0 && token.length>=2){
              let lower = token.toLowerCase();
              for (let i=0; i<(lower.length/2); i++){
                  if (lower.charAt(i) != lower.charAt(lower.length -i -1)){
                      checkStatus = false;
                  }
              }
              if (checkStatus){
                  result.push(token);
              }
          }
      }
  
      return result;
  };

let replaceChar = (string) => {
    if (typeof string !== 'string'){
        throw `Input must be a string`
    }
    if (typeof string == undefined){
        throw `string does not exist`;
    }
    if (string.trim().length < 1){
        throw `string  is empty`
    }

    string = string.trim();
    let strLen = string.length;
    let result = string;
    for (let i=0; i<strLen; i++){
        if (i%4 == 1){
            result = result.substring(0, i) + "*" + string.substring(i+1);
        } else if (i%4 == 3){
            result = result.substring(0,i) + "$" + string.substring(i+1);
        }
    }
    return result;
};

let charSwap = (string1, string2) => {
      let strings = [string1, string2];
      for (let string of strings){
          if (typeof string != 'string'){
              throw `Input must all be string`;
          }
          if (typeof string == undefined){
              throw `string does not exist`;
          }
          if (string.trim().length < 4){
              throw `string must have a at least length of 4`
          }
      }
      
      string1 = string1.trim();
      string2 = string2.trim();
      let newStr1 = string2.substring(0,4) + string1.substring(4, string1.length);
      let newStr2 = string1.substring(0,4) + string2.substring(4, string2.length);
      let result = newStr1 + " " + newStr2;
  
      return result;
  };

module.exports = {
    palindromes,
    replaceChar,
    charSwap
};
