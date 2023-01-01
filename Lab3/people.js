const axios = require('axios');

async function getPeople(){
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
  }

const getPersonById = async (id) => {

    const data = await getPeople();

    // check if id is a valid input
    // !id
    if (typeof id !== 'string') {
        throw `${id} is not a string. Input must be a string`
    }
    if (id.trim().length == 0) {
        throw  `Input ${id} cannot be empty`
    }
    // trim string
    id = id.trim();
    //console.log(id);
    for (let d of data) {
        if (d['id'] == id) {
            return d;
        } 
    }
};

const sameJobTitle = async (jobTitle) => {
    const data = await getPeople();

    // check if input is valid
    if (typeof jobTitle != 'string') {
        throw `${jobTitle} is not a string. Input must be a string`
    }
    if (jobTitle.trim().length == 0) {
        throw  `Input ${jobTitle} string cannot be empty`
    }
    
    // trim string
    jobTitle = jobTitle.trim();
    
    let output = [];
    for (let obj of data) {
        if (obj['job_title'].toLowerCase() == jobTitle.toLowerCase()) {
            output.push(obj);
        }
    }
    
    // check output length
    if (output.length == 0) {
        throw `Given ${jobTitle}, job not found`
    } else if (output.length == 1) {
        throw `Given ${jobTitle}, there are not two people with that job title`
    }

    return output;
};

const getPostalCodes = async (city, state) => {
    const data = await getPeople();

    // check if input are valid
    let location = [city, state];
    for (let str of location){
        if (typeof str != 'string') {
            throw `${str} is not a string. Input must be a string`
        }
        if (str.trim().length == 0) {
            throw `String ${str} length must be greater than 0`
        }
    } 

    // trim string
    city = city.trim();
    state = state.trim();

    let output = [];
    for (let obj of data) {
        if (obj['city'].toLowerCase() == city.toLowerCase() 
            && obj['state'].toLowerCase() == state.toLowerCase()) {
            output.push(Number(obj['postal_code']));
        }
    }
    if (output.length == 0) {
        throw `Given  city: ${city} & state: ${state}, postal code not found`
    }

    // Sort postal code
    output.sort(function(a, b){return a-b});
    return output;
};

const sameCityAndState = async (city, state) => {
    const data = await getPeople();

    // check if input are valid
    let location = [city, state];
    for (let str of location){
        if (typeof str != 'string') {
            throw `${str} is not a string. Input must be a string`
        }
        if (str.trim().length == 0) {
            throw `String ${str} length must be greater than 0`
        }
    } 

    // trim string
    city = city.trim();
    state = state.trim();

    let output = [];
    for (let obj of data) {
        if (obj['city'].toLowerCase() == city.toLowerCase() 
            && obj['state'].toLowerCase() == state.toLowerCase()) {
            output.push({"first_name": obj['first_name'], "last_name":obj['last_name']})
        }
    } 
    if (output.length == 0) {
        throw `Given  city: ${city} & state: ${state}, no one lives here`
    } else if(output.length == 1){
        throw `Given  city: ${city} & state: ${state}, there are not two people who live in the same city and state`
    }

    // Sort by last name
    function byLastName(key){
        return function(m,n){
            if ( m[key].toUpperCase() < n[key].toUpperCase()){
                return -1;
            } else if (m[key].toUpperCase() > n[key].toUpperCase()) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    output.sort(byLastName('last_name'));

    // Parse first name & last name
    let nameArr = [];
    for (let obj of output) {
        let name = obj['first_name'] + ' ' + obj['last_name'];
        nameArr.push(name);
    }

    return nameArr;
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState};
