const express = require('express');
const router = express.Router();
const usersData = require('../data/users');
const helpers = require('../helpers');

function authenticate(req, res, next) {
  if (req.session.user) return next();
  else res.status(403).render("error", { title: "Invalid Entry" });
}

router
  .route('/')
  .get(async (req, res) => {
    if (!req.session.user) {
      return res.render('userLogin', {document_title: 'Login'});
    } else {
      return res.redirect('/protected');
    }
  })

router
  .route('/register')
  .get(async (req, res) => {
    if (!req.session.user) {
      res.render('userRegister', {document_title: 'Register'});
      return;
    }else {
      res.redirect('/protected');
      return;
    }
  })
  .post(async (req, res) => {
    const userInput = req.body;
    try {
      username = helpers.checkUserName(userInput.username);
      password = helpers.checkPassword(userInput.password);
    } catch(e) {
      return res.status(400).render("userRegister", {document_title: 'Register', error_message: e});
    }
    
    try {
      const { insertedUser } = await usersData.createUser(username, password);
      if (insertedUser){
        return res.status(200).redirect('/');
      } else {
        return res.status(500).json({error: "Internal Server Error"});
      }
    } catch(e) {
      return res.status(400).render('userRegister', {document_title: 'Register', error_message: e})
    }
  })
 
router
  .route('/login')
  .post(async (req, res) => {
    const userInput = req.body;
    try {
      username = helpers.checkUserName(userInput.username);
      password = helpers.checkPassword(userInput.password);
    } catch(e) {
      return res.status(400).render("userLogin", {document_title: 'Login', error_message: e});
    }

    try {
      const {authenticatedUser} = await usersData.checkUser(username, password);
      if (authenticatedUser) {
        req.session.user = username; 
        return res.status(200).redirect('/protected');
      } else {
        return res.status(400).render('userLogin', {document_title:'Login', error_message: e});
      }
    } catch(e) {
      return res.status(400).render('userLogin', {document_title:'Login', error_message: e});
    }
  })

router
  .get('/protected', authenticate, async (req, res) => {
    return res.render('private', {document_title: 'Private', user_name: req.session.user});
  })

router
  .route('/logout')
  .get(async (req, res) => {
    if (req.session.user) {
      res.clearCookie("AuthCookie");
      req.session.destroy();
      return res.render('logout', {document_title: 'Logout'});
    }
  })

module.exports = router;
