const axios = require("axios");
const helpers = require('../helpers');

const getAllPeople = async () => {
    let {data} = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    // check if input is valid
    helpers.checkValid(searchPersonName);
    searchPersonName = helpers.checkString(searchPersonName);
    searchPersonName = helpers.checkName(searchPersonName);

    // Find among first name & last name
    const peopleList = await getAllPeople();
    let out = [];
    for (let info of peopleList) {
        if (info.firstName.toLowerCase().match(searchPersonName) || info.lastName.toLowerCase().match(searchPersonName)) {
            out.push(info);
        }
    }
    
    // sort by id, up to 20
    out.sort(function(a, b) {return a.id - b.id});
    out = out.slice(0,20);

    return out;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    // check if id is valid
    helpers.checkValid(id);
    //id = helpers.checkString(id);
    id = helpers.checkId(id);
    // find by id
    const peopleList = await getAllPeople();
    let out = [];
    for (x of peopleList) {
        if (x['id'] === id) {
            out.push(x);
        }
    }
    if (out.length == 0) throw `error: cannot find person with id of ${id}.`;
    return out[0];
};

module.exports = { searchPeopleByName, searchPeopleByID };
