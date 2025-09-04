const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const ExpresError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const reviewController = require("../controller/review.js");
const {
  validateReview,
  isLoggedIn,
  isreviewAuthor,
} = require("../middleware.js");

// Reviews

// add
router.post(
  "/:id/reviews",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.add)
);

// Delete  Review Route

router.delete(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  isreviewAuthor,
  wrapAsync(reviewController.delete)
);

router.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong " } = err;
  res.render("error.ejs", { err });
  // res.status(statusCode).send(message);
});

module.exports = router;
