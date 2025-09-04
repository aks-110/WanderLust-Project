const Listing = require("./models/listings.js")
const Review = require("./models/review.js");
const { reviewSchema } = require("./schema.js");
const ExpresError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // usoi path pr jayga
    req.flash("error", "you must be logged in to create listing !");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if ( !listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the owner of the listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};


module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(".");
    throw new ExpresError(404, errMsg);
  } else {
    next();
  }
};



module.exports.isreviewAuthor = async (req, res, next) => {
  let { id ,reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if ( !review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "you are not the author of this review ");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
