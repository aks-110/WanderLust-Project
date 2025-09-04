const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpresError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

const listingController = require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/") // index route
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listings[image]"),
    wrapAsync(listingController.create)
  ); // create route

// new route

router.get("/new", isLoggedIn, listingController.new);

router
  .route("/:id")
  .get(wrapAsync(listingController.show)) // show
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listings[image]"),
    wrapAsync(listingController.update)
  ) // update
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.delete)); // delete

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.edit));

module.exports = router;
