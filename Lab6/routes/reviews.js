const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const reviewData = data.reviews;
const helpers = require('../helpers');

router
  .route('/:movieId')
  .get(async (req, res) => {
    try {
      movieId = helpers.checkId(req.params.movieId);
    }catch (e) {
      res.status(400).json({error: e});
      return;
    }

    try {
      await movieData.getMovieById(movieId);
    } catch (e) {
      res.status(404).json({error: 'Movie not found'});
      return;
    }

    try {
      const allReviews = await reviewData.getAllReviews(movieId);
      if (allReviews.length == 0) {
        return res.status(404).json({error: 'No reviews for this movie'});
      }
      res.status(200).json(allReviews);
    } catch(e) {
      res.status(500).json({error: "Movie not found"});
    }
  })
  .post(async (req, res) => {
    let reviewInfo = req.body;

    try {
      movieId = helpers.checkId(req.params.movieId);
      reviewTitle = helpers.checkReviewTitle(reviewInfo.reviewTitle); 
      reviewerName = helpers.checkName(reviewInfo.reviewerName); 
      review = helpers.checkReview(reviewInfo.review); 
      rating = helpers.checkReviewRating(reviewInfo.rating);
    } catch(e) {
      res.status(400).json({error: e});
      return;
    }

    try{
      await movieData.getMovieById(movieId);
    } catch(e) {
      res.status(404).json({error: "Movie not found"});
      return;
    }

    try {
      await reviewData.createReview(movieId, reviewTitle, reviewerName, review, rating);
      res.status(200).json(await movieData.getMovieById(movieId));
    } catch(e) {
      res.status(500).json({error: "Counld not "});
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try {
      reviewId = helpers.checkId(req.params.reviewId);
    }catch (e) {
      res.status(400).json({error: e});
      return;
    }

    try{
      let thatReview = await reviewData.getReview(reviewId);
      res.status(200).json(thatReview);
    } catch(e){
      res.status(404).json({error: "No review is associated with provided review id."});
    }  
  })
  .delete(async (req, res) => {
    try {
      reviewId = helpers.checkId(req.params.reviewId);
    } catch(e) {
      res.status(400).json({error: e});
      return;
    }

    try {
      await reviewData.getReview(reviewId);
    } catch(e) {
      res.status(404).json({error: "No review is associated with provided review id."});
      return;
    }

    try {
      const finalMovieData = await reviewData.removeReview(reviewId);
      res.status(200).json(finalMovieData);
    } catch (e) {
      res.status(500).json({error: e});
    }

  });

  module.exports = router;
