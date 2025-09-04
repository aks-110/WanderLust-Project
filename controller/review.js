const Listing = require("../models/listings.js");
const Review = require("../models/review.js");

module.exports.add = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "new review created !! ");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.delete = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review deleted Successfully !!");
  res.redirect(`/listings/${id}`);
};
