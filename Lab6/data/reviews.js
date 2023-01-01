const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
let {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  movieId = helpers.checkId(movieId);
  reviewTitle = helpers.checkReviewTitle(reviewTitle);
  reviewerName = helpers.checkName(reviewerName);
  review = helpers.checkReview(review);
  rating = helpers.checkReviewRating(rating);
  const date = new Date();
  reviewDate = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
  
  const reviewId = new ObjectId();
  
  let newReview = {
    _id: reviewId,
    reviewTitle: reviewTitle,
    reviewDate: reviewDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  }

  const movieCollection = await movies();
  const movieData = await movieCollection.findOne({_id: ObjectId(movieId)});
  if (movieData === null) throw 'No Movie with such id.';
  movieData['reviews'].push(newReview);
  movieData['overallRating'] = helpers.getOverallRating(movieData['reviews']);
  //console.log(movieData);

  const updatedInfo = await movieCollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: movieData}
  );
  if (updatedInfo.modifiedCount === 0) throw 'Could not update the review of that movie.'
  // if (updatedInfo.matchedCount == 0) {
  //   //await removeReview(reviewId.toString());
  //   throw "Review already exists.";
  // };
  newReview['_id'] = newReview['_id'].toString();
  return newReview;
};

const getAllReviews = async (movieId) => {
  movieId = helpers.checkId(movieId);
  
  const movieCollection = await movies();
  const movieObj = await movieCollection.findOne({_id: ObjectId(movieId)});
  if (movieObj === null) {
    throw `No movie exists with that id.`
  }
  movieObj['reviews'].forEach(element =>{
    element._id = element._id.toString();
  })
  return movieObj['reviews'];
};

const getReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId);

  const movieCollection = await movies();
  const movieObj = await movieCollection.find({"reviews._id": ObjectId(reviewId)}).toArray();
  if (movieObj === null) {
    throw `No review exists with that id.`;
  } 

  let reviews= movieObj[0]['reviews'];
  reviews.forEach(element =>{
    element._id = element._id.toString();
  })
  for (let i of reviews) {
    if (i['_id'] == reviewId) {
      return i;
    }
  };

};

const removeReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId);
  
  // retrieve the movie id for the following rating updates
  const movieCollection = await movies();
  const movieObj = await movieCollection.find({'reviews._id': ObjectId(reviewId)}).toArray();
  if (movieObj === null) {
    throw `No movie exists with that id.`
  }

  const movieId = movieObj[0]['_id'].toString();

  // remove the review
  const reviewsUpdated = await movieCollection.updateOne({'reviews._id': ObjectId(reviewId)},
                                                          {$pull: {reviews: { _id: ObjectId(reviewId)}}});
  if (reviewsUpdated.modifiedCount == 0) throw 'Could not remove the review of that movie.';

  // update the overall rating
  const allReviews = await getAllReviews(movieId);
  const movieUpdated = {
    overallRating: helpers.getOverallRating(allReviews)
  };
  const updatedMovies = await movies();
  const thatMovieUpdatedInfo = await updatedMovies.updateOne(
    {_id: ObjectId(movieId)},
    {$set: movieUpdated}
  );
  //if (thatMovieUpdatedInfo.modifiedCount == 0) throw 'Could not update the overall rating of the reviews of that movie.';
  
  const finalMovie = await updatedMovies.findOne({_id: ObjectId(movieId)});
  finalMovie['reviews'].forEach(element =>{
    element._id = element._id.toString();
  })
  finalMovie['_id'] = finalMovie['_id'].toString();
  return finalMovie;

};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
