const User = require("../models/user");
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User was registered Successfully ");
      res.redirect("/listings");
    });
  } catch (e) {
    console.log(e);
    req.flash("error", "user is already exists");
    res.redirect("/signup");
  }
};
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/listings");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are Successfully logout");
    res.redirect("/listings");
  });
};
