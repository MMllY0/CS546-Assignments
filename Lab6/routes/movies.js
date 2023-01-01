const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const helpers = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const movieList  = await movieData.getAllMovies();
      let out = [];
      for (let movie of movieList) {
        out.push({"_id": movie['_id'], "title":movie['title']});
      }
      res.status(200).json(out);
    } catch (e) {
      res.status(500).send();
      return;
    }
  })
  .post(async (req, res) => {
    let movieInfo = req.body;

    if (!movieInfo) {
      return res.status(400).json({error: "Must provide movie data."});
    }

    try {
      movieInfo.title = helpers.checkTitle(movieInfo.title);
      movieInfo.plot = helpers.checkPlot(movieInfo.plot);
      movieInfo.genres = helpers.checkGenres(movieInfo.genres);
      movieInfo.rating = helpers.checkRating(movieInfo.rating);
      movieInfo.studio = helpers.checkStudio(movieInfo.studio);
      movieInfo.director = helpers.checkName(movieInfo.director);
      movieInfo.castMembers = helpers.checkCastMembers(movieInfo.castMembers);
      movieInfo.dateReleased = helpers.checkDateReleased(movieInfo.dateReleased);
      movieInfo.runtime = helpers.checkRuntime(movieInfo.runtime);
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try {
      const newMovie = await movieData.createMovie(
        movieInfo.title,
        movieInfo.plot,
        movieInfo.genres,
        movieInfo.rating,
        movieInfo.studio,
        movieInfo.director,
        movieInfo.castMembers,
        movieInfo.dateReleased,
        movieInfo.runtime
      );
      res.status(200).json(newMovie);
    } catch (e) {
      res.status(500).json({error: e});
    }
  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    try{
      req.params.movieId = helpers.checkId(req.params.movieId);
    } catch(e) {
      return res.status(400).json({error: e});
    } 
    try {
      const thatMovie = await movieData.getMovieById(req.params.movieId);
      res.status(200).json(thatMovie);
    } catch(e) {
      res.status(404).json({error: "Movie not found"});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try{
      movieId = helpers.checkId(req.params.movieId);
    } catch(e) {
      res.status(400).json({error: e});
      return;
    }

    try{
      await movieData.getMovieById(movieId);
    } catch (e){
      res.status(404).json({error: "Movie not found"});
      return;
    }

    try {
      await movieData.removeMovie(movieId);
      res.status(200).json({'movieId': movieId, 'deleted': true});
    } catch(e) {
      res.status(500).json({error: e});

    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const updatedMovieData = req.body;
    try {
      req.params.movieId = helpers.checkId(req.params.movieId);
      updatedMovieData.title = helpers.checkTitle(updatedMovieData.title);
      updatedMovieData.plot = helpers.checkPlot(updatedMovieData.plot);
      updatedMovieData.genres = helpers.checkGenres(updatedMovieData.genres);
      updatedMovieData.rating = helpers.checkRating(updatedMovieData.rating);
      updatedMovieData.studio = helpers.checkStudio(updatedMovieData.studio);
      updatedMovieData.director = helpers.checkName(updatedMovieData.director);
      updatedMovieData.castMembers = helpers.checkCastMembers(updatedMovieData.castMembers);
      updatedMovieData.dateReleased = helpers.checkDateReleased(updatedMovieData.dateReleased);
      updatedMovieData.runtime = helpers.checkRuntime(updatedMovieData.runtime);
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try {
      initialMovieData = await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      res.status(404).json({error: 'Movie not found'});
      return;
    }
    
    try {
      const finalMovieData = await movieData.updateMovie(
        req.params.movieId,
        updatedMovieData.title,
        updatedMovieData.plot,
        updatedMovieData.genres,
        updatedMovieData.rating,
        updatedMovieData.studio,
        updatedMovieData.director,
        updatedMovieData.castMembers,
        updatedMovieData.dateReleased,
        updatedMovieData.runtime
      );
      res.status(200).json(finalMovieData);
    } catch(e) {
      res.status(500).json({error: e});
    }
  });

  module.exports = router;
