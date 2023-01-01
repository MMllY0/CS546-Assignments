// if no person returned by name, should it throw or proceed normally

const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;
const path = require('path');
const helpers = require('../helpers');

router.route("/").get(async (req, res) => {
  try {
    res.sendFile(path.resolve('static/homepage.html'));
  } catch(e) {
    res.status(404).json({error: "page not found"});
  }
});

router.route("/searchpeople").post(async (req, res) => {
  if (!req.body) {
    res.status(400).render('error', {title: 'People Found', message: 'no valid information provided'});
    return;
  }

  let { searchPersonName } = req.body;
  try {
    helpers.checkValid(searchPersonName);
    searchPersonName = helpers.checkString(searchPersonName);
    searchPersonName = helpers.checkName(searchPersonName);
  } catch(e) {
    res.status(400).render('error', {title: 'People Found', message: e});
    return;
  }

  try{
      const results = await peopleData.searchPeopleByName(searchPersonName);
      if (results.length == 0) {
        res.render('personNotFound', {title: 'People Found', searchPersonName: searchPersonName});
        return;
      }
      res.render('peopleFound', {title: 'People Found', results: results, searchPersonName: searchPersonName});
      return;
    } catch(e) {
    res.status(404).render('personNotFound', {message: e, title: 'People Found', searchPersonName: searchPersonName});
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  let peopleId = req.params.id;
  try {
    helpers.checkValid(peopleId);
    peopleId = helpers.checkString(peopleId);
    peopleId = helpers.checkId(peopleId);
  } catch(e) {
    res.status(400).render('error', {title: 'Person Found', message: e});
    return;
  }

  try {
    personFound = await peopleData.searchPeopleByID(peopleId);
    res.render('personFoundByID', {title: 'Person Found', person: personFound});
    return;
  }catch(e) {
    res.status(404).render('error', {message: e, title: 'Person Found'});
  }
});

module.exports = router;
