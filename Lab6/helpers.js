const {ObjectId} = require('mongodb');

 function checkValid(field){
    if (!field) {
        throw `Input needs to have valid values`;
    }
  };
  
  function checkString(str) {
    if (typeof str !== 'string') {throw `Input "${str}" type must be string`};
    if (str.trim().length === 0) {throw `Input string "${str}" length cannot be empty`}
  }
  // id - check if it's a valid object id
  function checkId(id) {
    checkValid(id);
    checkString(id);
    id = id.trim();
    if (id.length == 0) throw 'id cannot be empty.';
    if (!ObjectId.isValid(id)) throw `Error: ${id} invalid object ID`;
    return id;
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
  // director/single name - no numbers or special characters or punctuation
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
    if (genres instanceof Array === false) {throw `Geners must be an array`}
    if (genres.length == 0) throw 'Genre is empty.'
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
    if (castMembers instanceof Array === false) {throw `Cast members must be an array`};
    if (castMembers.length == 0) throw 'Cast member list is empty.';
    let out = [];
    for (let person of castMembers) {
        checkValid(person);
        checkString(person);
        // console.log(person);
        // console.log(person instanceof Array);
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
    var myDate = new Date();
    if (year < "1900" || Number(year) > (myDate.getFullYear()+2)) {throw `Year should between 1900-2024`};
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
  
  // review title - can have punctuation & special character
  function checkReviewTitle(reviewTitle) {
    checkValid(reviewTitle);
    checkString(reviewTitle);
    reviewTitle = reviewTitle.trim();
    if (reviewTitle.length == 0) throw 'Review title cannot be empty';
    const pattern = /^[\p{S}\p{N}\p{P}\s]+$/gu;
    if (reviewTitle.match(pattern)) throw 'Cannot only contain punctuation or special character or numbers.';
    return reviewTitle;
  }
  
  function checkReview(review) {
    checkValid(review);
    checkString(review);
    review = review.trim();
    if (review.length == 0) throw 'Review cannot be empty';
    const pattern = /^[\p{S}\p{N}\p{P}\s]+$/gu;
    if (review.match(pattern)) throw 'Review cannot only contain punctuation or special character or numbers.';
    return review;
  }

  // rating - only one decimal, [1,5]
  function checkReviewRating(rating) {
    checkValid(rating);
    if (typeof rating !== 'number') throw 'Rating should be a number';
    if (rating < 1 || rating > 5) throw 'Rating should between 1 to 5.';
    const pattern = /^[1-5]{1}[.]\d{1}$/gu;
    if (Number.isInteger(rating)) {
      return rating;
    } else if (!rating.toString().match(pattern)) {
      throw 'Rating can only have one decimal place.';
    };
    return rating;
  }

  // reviewer name - same as director/single name 

  function getOverallRating (reviews) {
    if (reviews.length === 0) {
      return 0;
    } else {
      let ratingSum = 0;
      for (let i=0; i<reviews.length; i++){
        ratingSum += reviews[i]['rating'];
      }
      overallRating = ratingSum / reviews.length;
    }
    return Number(overallRating.toFixed(1));
  }
module.exports = {
  checkValid, 
  checkString,
  checkId,
  checkTitle,
  checkPlot,
  checkStudio,
  checkName,
  checkRating,
  checkGenres,
  checkCastMembers,
  checkDateReleased,
  checkRuntime,
  checkReview,
  checkReviewTitle,
  checkReviewRating,
  getOverallRating
}