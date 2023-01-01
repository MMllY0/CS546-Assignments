/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objectUtils = require('./objectUtils');

try {
    // Should Pass
    const checkArrayStats = arrayUtils.arrayStats([7, 9, 11, 15, 19, 20, 35, 0]);
    console.log(checkArrayStats);
    console.log('ArrayStats passed successfully');
} catch (e) {
    console.error('ArrayStats failed test case');
}

try {
    // Should Fail
    const checkArrayStats = arrayUtils.arrayStats([]);
    console.log(checkArrayStats);
    console.error('ArrayStats did not error');
} catch (e) {
    console.log('ArrayStats failed successfully');
}
console.log("-------------------------------------");
 
try {
    // Should Pass
    const checkMakeObjects = arrayUtils.makeObjects(["foo", "bar"], [5, "John"]);
    console.log(checkMakeObjects);
    console.log('Make Objects passed successfully');
} catch (e) {
    console.error('Make Objects failed test case');
}

try {
    // Should Fail
    const checkMakeObjects = arrayUtils.makeObjects([1],[1,2]);
    console.log(checkMakeObjects);
    console.error('Make Objects did not error');
} catch (e) {
    console.log('Make Objects failed successfully');
}
console.log("-------------------------------------");

try {
    // Should Pass
    const checkCommonElements = arrayUtils.commonElements([true, 5, 'Patrick'],[true, 5, 'Patrick'],[67.7, 'Patrick', true]);
    console.log(checkCommonElements);
    console.log('Common Elements passed successfully');
} catch (e) {
    console.error('Common Elements failed test case');
}

try {
    // Should Fail
    const checkCommonElements = arrayUtils.commonElements("test");
    console.log(checkCommonElements);
    console.error('Common Elements did not error');
} catch (e) {
    console.log('Common Elements failed successfully');
}

console.log("-------------------------------------");

try {
    // Should Pass
    const checkPalindromes = stringUtils.palindromes('!Wow! Di-d you ee!see that racecar go?');
    console.log(checkPalindromes);
    console.log('Palindromes passed successfully');
} catch (e) {
    console.error('Palindromes failed test case');
}

try {
    // Should Fail
    const checkPalindromes = stringUtils.palindromes(25);
    console.log(checkPalindromes);
    console.error('Palindromes did not error');
} catch (e) {
    console.log('Palindromes failed successfully');
}
console.log("-------------------------------------");

try {
    // Should Pass
    const checkReplaceChar = stringUtils.replaceChar('      Hello My name is Ellie.');
    console.log(checkReplaceChar);
    console.log('Replace Char passed successfully');
} catch (e) {
    console.error('Replace Char failed test case');
}

try {
    // Should Fail
    const checkReplaceChar = stringUtils.replaceChar(25);
    console.log(replaceChar);
    console.error('Replace Char did not error');
} catch (e) {
    console.log('Replace Char failed successfully');
}

console.log("-------------------------------------");

try {
    // Should Pass
    const checkCharSwap = stringUtils.charSwap('      Hello ', 'Welcome');
    console.log(checkCharSwap);
    console.log('Char Swap passed successfully');
} catch (e) {
    console.error('Char Swap failed test case');
}

try {
    // Should Fail
    const checkCharSwap = stringUtils.charSwap('h', 'e');
    console.log(checkCharSwap);
    console.error('Char Swap did not error');
} catch (e) {
    console.log('Char Swap failed successfully');
}
console.log("-------------------------------------");

try {
    // Should Pass
    const checkDeepEquality = objectUtils.deepEquality({1: [1, {2:"a", 1:"b"}]}, {1: [1, {1:"b", 2:"a"}]});
    console.log(checkDeepEquality);
    console.log('Deep Equality passed successfully');
} catch (e) {
    console.error('Deep Equality failed test case');
}

try {
    // Should Fail
    const checkDeepEquality = objectUtils.deepEquality([1,2,3], [1,2,3]);
    console.log(checkDeepEquality);
    console.error('Deep Equality did not error');
} catch (e) {
    console.log('Deep Equality failed successfully');
}
console.log("-------------------------------------");

try {
    // Should Pass
    const checkCommonKeysValues = objectUtils.commonKeysValues({a:2, b:{a:true}, c:{d:true, e:true}}, {a:3, b:{d:true}, c:{e:true, d:true}});
    console.log(checkCommonKeysValues);
    console.log('Common KeysValues passed successfully');
} catch (e) {
    console.error('Common KeysValues failed test case');
}

try {
    // Should Fail
    const checkCommonKeysValues = objectUtils.commonKeysValues([1,2,3], [1,2,3]);
    console.log(checkCommonKeysValues);
    console.error('Common KeysValues did not error');
} catch (e) {
    console.log('Common KeysValues failed successfully');
}
console.log("-------------------------------------");

try {
    // Should Pass
    const checkCalculateObject = objectUtils.calculateObject({a:1, b:2, c:3}, n=> n**3);
    console.log(checkCalculateObject);
    console.log('Calculate Object passed successfully');
} catch (e) {
    console.error('Calculate Object failed test case');
}

try {
    // Should Fail
    const checkCalculateObject = objectUtils.calculateObject({a:1, b:2, c:3}, n=> n*(-20));
    console.log(checkCalculateObject);
    console.error('Calculate Object did not error');
} catch (e) {
    console.log('Calculate Object failed successfully');
}