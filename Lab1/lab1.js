function questionOne(arr) {
  // TODO: Implement question 1 here
  function checkPrime(num){

    let isPrime = true;
    if (num>=2 && Number.isInteger(num)){
        for (i=2; i< num/2+1; i++){
            if (num % i === 0){
                isPrime = false;
            }
          }
    }
    else{
        isPrime = false;
    }
    return isPrime;
  }

  let output = [];
  arr.forEach(element => {
    output.push(checkPrime(element));
}); 
  return output;
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here
  let result = 0;
  if (startingNumber != 0 && commonRatio != 0 && numberOfTerms >0 && Number.isInteger(numberOfTerms)){
      for (var i=0; i<numberOfTerms; i++){
          result = result + startingNumber * Math.pow(commonRatio, i);
      }
  } else if (startingNumber == 0 || commonRatio == 0){
      result = 0;
  } else if (numberOfTerms <=0 || Number.isInteger(numberOfTerms)==false){
      result = NaN;
  }
  
  return result;
}

function questionThree(str) {
  // TODO: Implement question 3 here
  let consonants = ["b", "c", "d", "f", "g", "j", "k", "l", "m", "n", "p", "q", "s", "t", "v", "x", "z", "h", "r", "w", "y"]; 
  let result = 0;
  let strLower = str; 
  strLower = str.toLowerCase();
  for (let i=0; i<str.length; i++){
      if(consonants.includes(strLower[i])){
          result += 1;
      }
  }
  return result;
}

function questionFour(fullString, substring) {
  // TODO: Implement question 4 here
  let occurence = 0;
  if (substring.length > 0){
      occurence = fullString.split(substring).length - 1;
  } 
  return occurence;
  }

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'Xinming',
  lastName: 'Yang',
  studentId: '10458564',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
