const lab1 = require('./lab1');

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
console.log(lab1.questionOne([5, 3, 10])); 
console.log(lab1.questionOne([7, 12, 20])); 
console.log(lab1.questionOne([23, 85, 73])); 
console.log(lab1.questionOne([51, 22, 61])); 
console.log(lab1.questionOne([1.1, -1, 0]));  

console.log(lab1.questionTwo(5, 3, 10));  // Returns and then outputs 147620 
console.log(lab1.questionTwo(2, 0, 2)); // Returns and then outputs 0 
console.log(lab1.questionTwo(512, 1007, -5)); //Returns and then outputs NaN
console.log(lab1.questionTwo(2, 10, 4)); //Returns and then outputs 2222
console.log(lab1.questionTwo(175, 3, 5)); //Returns and then outputs 21175 

console.log(lab1.questionThree("How now brown cow"));  // Returns and then outputs 10
console.log(lab1.questionThree("Welcome to Stevens Institute of Technology")); // Returns and then outputs 23
console.log(lab1.questionThree("JavaScript is fun!")); //Returns and then outputs 10

console.log(lab1.questionFour("Chromatic Ball", "c"));  
console.log(lab1.questionFour("Helllo, alll", "ll")); 
