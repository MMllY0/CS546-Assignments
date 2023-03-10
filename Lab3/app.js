/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

const people = require("./people");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

const people = require('./people');
const companies = require('./companies');

async function main(){
    try{
        const pId = 'eb3b5129-b743-4092-865d-4ce444acfa0b';
        const personObj = await people.getPersonById(pId);
        console.log(personObj);
    }catch(e){
        console.log(e);
    }

    // try{
    //     const jTitle = "OPERator";
    //     const jobObj = await people.sameJobTitle(jTitle);
    //     console.log(jobObj);
    // } catch(e){
    //     console.log(e);
    // }

    // try{
    //     const postalCode = await people.getPostalCodes(" Salt Lake city ", 111);
    //     console.log(postalCode);
    // } catch(e){
    //     console.log(e);
    // }

    // try{
    //     const names = await people.sameCityAndState("Trenton", "     NEW Jersey");
    //     console.log(names);
    // } catch(e){
    //     console.log(e);
    // }

    // try{
    //     const employees = await companies.listEmployees('YOST, Harris and Cormier');
    //     console.log(employees);
    // } catch(e){
    //     console.log(e);
    // }

    // try{
    //     const compInSameIndustry= await companies.sameIndustry('APPAREL');
    //     console.log(compInSameIndustry);
    // } catch(e){
    //     console.log(e);
    // }

    // try{
    //     const getCompanyObj = await companies.getCompanyById('fb90892a-f7b9-4687-b497-d3b4606faddf');
    //     console.log(getCompanyObj);
    // } catch(e){
    //     console.log(e);
    // }

}
main();

