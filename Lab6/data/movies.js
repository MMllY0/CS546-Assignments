const mongoCollections = require('../config/mongoCollections');
let movies = mongoCollections.movies;
const {ObjectId} = require('mongodb');
let helpers = require('../helpers');

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
  title = helpers.checkTitle(title);
  plot = helpers.checkPlot(plot);
  genres = helpers.checkGenres(genres);
  rating = helpers.checkRating(rating);
  studio = helpers.checkStudio(studio);
  director = helpers.checkName(director);
  castMembers = helpers.checkCastMembers(castMembers);
  dateReleased = helpers.checkDateReleased(dateReleased);
  runtime = helpers.checkRuntime(runtime);

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
    runtime : runtime,
    reviews: [],
    overallRating: 0 
  };


  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw `Could not add movie`
  };
  const newId = insertInfo.insertedId.toString();
  const movie = await getMovieById(newId);
  movie._id = movie._id.toString();
  return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  if (!movieList) throw 'Movie list cannot be fetched.';
  movieList.forEach(element => {
    element['_id'] = element['_id'].toString();
  });
  return movieList;
}

const getMovieById = async (movieId) => {
  helpers.checkValid(movieId);
  helpers.checkString(movieId);
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw `Invalid movie id ${movieId}.`;
  
  const movieCollection = await movies();
  const movieObj = await movieCollection.findOne({_id: ObjectId(movieId)});
  if (JSON.stringify(movieObj) == "{}") throw 'No movie exists with that id.';
  movieObj['_id'] = movieObj['_id'].toString();
  if (movieObj.length != 0) {
    movieObj['reviews'].forEach(element => {
      element._id = element._id.toString();
    })
  }
  return movieObj;
};

const removeMovie = async (movieId) => {
  helpers.checkValid(movieId);
  helpers.checkString(movieId);
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw `Invalid movie id ${movieId}.`;

  const movieCollection = await movies();
  // retrieve movie name
  let movie = await getMovieById(movieId);
  //let movieTitle = movie['title'];
  //delete movie
  const deleteInfo = await movieCollection.deleteOne({_id: ObjectId(movieId)});
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${movieId}`;
  }

  return;
};

const updateMovie = async (
  movieId,
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

  movieId = helpers.checkId(movieId);
  title = helpers.checkTitle(title);
  plot = helpers.checkPlot(plot);
  genres = helpers.checkGenres(genres);
  rating = helpers.checkRating(rating);
  studio = helpers.checkStudio(studio);
  director = helpers.checkName(director);
  castMembers = helpers.checkCastMembers(castMembers);
  
  dateReleased = helpers.checkDateReleased(dateReleased);
  runtime = helpers.checkRuntime(runtime);

  const movieCollection = await movies();
  const updatedMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
  };

  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: updatedMovie}
  );
  if (updatedInfo.modifiedCount === 0) throw 'There is no changes. Could not update movie.'
  
  return await getMovieById(movieId);
};

// const renameMovie = async (id, newName) => {
//   //Not used for this lab
// };

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie
  
};
