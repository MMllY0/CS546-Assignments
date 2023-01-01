const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const { ObjectId } = require('mongodb');

function checkValid(field){
  if (!field) {
      throw `Input needs to have valid values`;
  }
};

function checkString(str) {
  if (typeof str !== 'string') {throw `Input type must be string`};
  if (str.trim().length === 0) {throw `Input string length cannot be empty`}
}

// title - no special character, no punctuation
function checkTitle(title) {
  checkValid(title);
  checkString(title);
  title = title.trim();
  if (title.length <2){throw `The length of title must be greater than 2`};
  const rexPattern = /\p{S}|\p{P}/gu;
  let status = title.match(rexPattern);
  if (status !== null){throw `Input title contains special characters or punctuation.`};
  return title;
}
// plot - not empty
function checkPlot(plot) {
  checkValid(plot);
  checkString(plot);
  plot = plot.trim();
  if (plot.length == 0) {throw `Plot cannot be empty`};
  if (plot.length === 1 && (plot.match(/\p{S}|\p{P}/gu) != null)) {throw `Plot cannot only contain punctuations or special characters`}
  return plot;
}
// studio - no numbers or special characters
function checkStudio(studio) {
  checkValid(studio);
  checkString(studio);
  studio = studio.trim();
  if (studio.length < 5){throw `The length of studio must be greater than 5`}; 
  const rexPattern = /\p{N}|\p{S}/gu;
  let status = studio.match(rexPattern);
  if (status !== null){throw `Input studio contains special characters or numbers.`};
  return studio;
}
// director - no numbers or special characters or punctuation
function checkName(director) {
  checkValid(director);
  checkString(director);    
  director = director.trim();
  let name = director.split(' ');
  const rexPattern = /\p{S}|\p{N}|\p{P}/gu;
  if (name.length >= 3) {throw `Name format should be like "first name space last name"`};
  for (let n of name) {
      if (n.length < 3){throw `Length of name ${n} must be greater than 3`};
      if (n.match(rexPattern) !== null) {throw `Name ${n} contains either special characters or punctuation or numbers.`};
  }
  return director;
}
// rating - not in the list
function checkRating(rating){
  checkValid(rating);
  checkString(rating);
  const ratingValues = ["G", "PG", "PG-13", "R", "NC-17"];
  rating = rating.trim();
  if (!ratingValues.includes(rating)){throw `Not valid rating value.`};
  return rating;
}
// genres - len5, no numbers or special characters or punctuation 
function checkGenres(genres) {
  checkValid(genres);
  if (genres.length == 0) throw 'Genre is empty.'
  if (genres instanceof Array === false) {throw `Geners must be an array`}
  const rexPattern = /\p{S}|\p{N}|\p{P}/gu;
  let out = [];
  for (let g of genres) {
      checkValid(g);
      checkString(g);
      if (g.trim().length <5) {throw `Genre ${g} length should be greater than 5`};
      if (g.trim().match(rexPattern) !== null) {throw `Genre ${g} contains either number, special character or punctuations.`};
      out.push(g.trim());
  }
  return out;
}
// cast members - no numbers or special characters
function checkCastMembers(castMembers) {
  checkValid(castMembers);
  if (castMembers.length == 0) throw 'Cast member list is empty.'
  if (castMembers instanceof Array === false) {throw `Cast members must be an array`};
  let out = [];
  for (let person of castMembers) {
      checkValid(person);
      checkString(person);
      person = person.trim();
      let name = person.split(' ');
      const rexPattern = /\p{S}|\p{N}/gu;
      if (name.length >= 3) {throw `Name format should be like "first name space last name"`};
      for (let n of name) {
          if (n.length < 3){throw `Length of name ${n} must be greater than 3`};
          if (n.match(rexPattern) !== null) {throw `Name ${n} contains either special characters or punctuation or numbers.`};
      }
      out.push(person.trim());
  }
  return out;
}
// date - format MM/DD/YYYY
function checkDateReleased(dateReleased) {
  checkValid(dateReleased);
  checkString(dateReleased);
  dateReleased = dateReleased.trim();
  const dateFormat = /^([0-1][0-9])\/(\d{2})\/(\d{4})$/;
  if (!dateReleased.match(dateFormat)) {throw `Released date is not in the a format of MM/DD/YYYY. No punctuations or special characters.`};
  let date = dateReleased.split('/');
  let month = date[0];
  let day = date[1];
  let year = date[2];
  if (month > '12' || month < '01') {throw `Invalid month`};
  if (day < '01' || day > '31') {throw `Invalid day`};
  if (year < "1900" || year > "2024") {throw `Year should between 1900-2024`};
  let month30 = ['04', '06', '09', '11'];
  if (month30.includes(month) && day>'30') {throw `Invalid month & day combination`};
  if (year %4 == 0 && month == '02' && day > '29') {throw `Invalid leap year date combination`};
  if (year %4 != 0 && month == '02' && day > '28') {throw `invalid february date & month combination`};
  return dateReleased;
}
// runtime - format "#h #min", no leading zero, 1 space in between
function checkRuntime(runtime) {
  checkValid(runtime);
  checkString(runtime);
  runtime = runtime.trim();
  const pattern = /^\d{1,2}h \d{1,2}min$/;
  if (!runtime.match(pattern)) {throw `The runtime should follow the format of "#h #min. Time should be positive integer."`};
  let time = runtime.match(/\d+/g);
  for (let t of time) {
      if (t.length != String(Number(t)).length){throw `Found Leading zero in time.`};
  }
  if (Number(time[1]) > 59) {throw `Minute should be less than 60`};
  if (Number(time[0]) === 0 && Number(time[1]) < 60) {throw `The runtime should be greater than 1 hour.`};
  return runtime;
}

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => { 

  title = checkTitle(title);
  plot = checkPlot(plot);
  genres = checkGenres(genres);
  rating = checkRating(rating);
  studio = checkStudio(studio);
  director = checkName(director);
  castMembers = checkCastMembers(castMembers);
  dateReleased = checkDateReleased(dateReleased);
  runtime = checkRuntime(runtime);
  
  const movieCollection = await movies();

  let newMovie = {
    title: title,
    plot : plot,
    genres : genres,
    rating : rating,
    studio : studio,
    director : director,
    castMembers : castMembers,
    dateReleased : dateReleased,
    runtime : runtime
  };

  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw `Could not add movie`
  };
  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);
  //console.log(movie._id);
  return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const allMovies = await movieCollection.find({}).toArray();
  if (!allMovies) {
    throw `All movies cannot be fetched.`};
  allMovies.forEach(element => {
    element['_id'] = element['_id'].toString();
  });
  return allMovies;
};

const getMovieById = async (id) => {
  checkValid(id);
  checkString(id);
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Invalid movie Id`
  }
  
  const movieCollection = await movies();
  const movieObj = await movieCollection.findOne({_id: ObjectId(id)});
  if (movieObj === null) {
    throw `No movie exists with that id.`
  }
  movieObj['_id'] = movieObj['_id'].toString();

  return movieObj;
};

const removeMovie = async (id) => {
  checkValid(id);
  checkString(id);
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw `Invalid movie Id`
  }

  const movieCollection = await movies();
  // retrieve movie name
  let movie = await getMovieById(id);
  let movieTitle = movie['title'];
  //delete movie
  const deleteInfo = await movieCollection.deleteOne({_id: ObjectId(id)});
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;
  }

  return `${movieTitle} has been successfully deleted!`;
};

const renameMovie = async (id, newName) => {
  checkValid(id);
  checkString(id);
  id = id.trim();
  newName = checkTitle(newName);
  if (!ObjectId.isValid(id)) {
    throw `Invalid movie Id`
  }

  const movieCollection = await movies();
  let movie = await getMovieById(id);
  let movieTitle = movie['title'];
  // check if new name is the same as the old one
  if (movieTitle === newName) {
    throw `The new title is the same as the old one.`
  }
  const updateMovie = {
    title: newName
  }
  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(id)},
    {$set: updateMovie}
  );
  if (updatedInfo.modifiedCount === 0) {
    throw `Could not update movie.`
  }
  
  return await getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  renameMovie
};
