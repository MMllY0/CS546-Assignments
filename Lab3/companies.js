const axios = require('axios');

async function getCompanies(){
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data;
  }

async function getPeople(){
    let { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
  }

const listEmployees = async (companyName) => {
    const companies = await getCompanies();
    const people = await getPeople();
    
    // check if input is valid
    if (typeof companyName != 'string') {
        throw `Company name ${companyName} is not a string. Input must be a string`
    } 
    if (companyName.trim().length == 0) {
        throw `Input company name ${companyName} cannot be zero`
    }

    // trim string
    companyName = companyName.trim();

    // find company info
    let companyInfo = companies.find(element => element['name'].toLowerCase() == companyName.toLowerCase());
    if (companyInfo === undefined) {
        throw `Given company name: ${companyName}, no such company found`
    } else{
        companyID = companyInfo['id'];
    }

    // create a hash where key is company id
    // values are employee name
    let cIdNameHash = {};
    cIdNameHash[companyID] = [];
    for (let person of people) {
        if (person['company_id'] == companyID) {
            cIdNameHash[companyID].push({"first_name": person['first_name'], 
                                         "last_name": person['last_name']});
        }
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

    // link the employee information
    if (cIdNameHash[companyID] !== -1) {
        employeeInfo = cIdNameHash[companyID];
        
        // sort name by last name
        employeeInfo.sort(byLastName('last_name'));

        // parse name
        let nameArr = [];
        for (let obj of employeeInfo) {
            let name = obj['first_name'] + ' ' + obj['last_name'];
            nameArr.push(name);
        }

        companyInfo['employees'] = nameArr;
    } else {
        companyInfo['employees'] = [];
    }

    return companyInfo;  

};

const sameIndustry = async (industry) => {
    const companies = await getCompanies();
    
    // check if input is valid
    if (typeof industry != 'string') {
        throw `Industry name ${industry} is not valid. Input must be a string`
    } 
    if (industry.trim().length == 0) {
        throw `Input ${industry} string length cannot be zero`
    }
    //trim the input
    industry = industry.trim();

    let companiesArr = [];
    for (let obj of companies){
        if (obj['industry'].toLowerCase() == industry.toLowerCase()){
            companiesArr.push(obj)
        }
    }
    if (companiesArr.length == 0) {
        throw `Given ${industry} entry, no companies in that industry`
    }

    return companiesArr;
};

const getCompanyById = async (id) => {
    const companies = await getCompanies();
    
    // check if input is valid
    if (typeof id != 'string') {
        throw `Company id ${id} is not valid. Input must be a string`
    } 
    if (id.trim().length == 0) {
        throw `Input ${id} company id length cannot be zero`
    }
    //trim the input
    id = id.trim();

    let companyInfo = companies.find(element => element['id'] == id);
    if (companyInfo === undefined) {
        throw `Given ${id} input id, no company found`
    } else{
        return companyInfo;
    }
};

module.exports = {
    listEmployees,
    sameIndustry,
    getCompanyById
};
