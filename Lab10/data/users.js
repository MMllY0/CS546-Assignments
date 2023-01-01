const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const helpers = require('../helpers');
const saltRounds = 16;

const createUser = async (
  username, password
) => { 
  username = helpers.checkUserName(username);
  username = username.toLowerCase();
  password = helpers.checkPassword(password);
  const hash = await bcrypt.hash(password, saltRounds);

  const userCollection = await users();
  const sameUser = await userCollection.findOne({username: username});
  if (sameUser !== null) throw `error: username already exists`;

  let newUser = {
    username: username,
    password: hash
  }

  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw `error: could not add movie`;
  // const newId = insertInfo.insertedId.toString();

  return {insertedUser: true};
};

const checkUser = async (username, password) => {
  username = helpers.checkUserName(username);
  password = helpers.checkPassword(password);

  const userCollection = await users();
  const userFound = await userCollection.findOne({username: username});
  if (userFound === null) throw `error: Either the username or password is invalid`;

  let compareToMatch = false;
  compareToMatch = await bcrypt.compare(password, userFound.password);
  if (compareToMatch) {
    return {authenticatedUser: true};
  } else {
    throw `error: Either the username or password is invalid.`
  }
};

module.exports = {
  createUser,
  checkUser
};
