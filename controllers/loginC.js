// Models Import
const User = require("../models/loginM");
// Lib Validator
const validator = require("fastest-validator");
const v = new validator();

module.exports = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Check If Email and Password Exist
      const valid = {
        email: "email|empty:false|min:5",
        password: "string|empty:false|min:8",
      };

      const validate = v.validate(email, password, valid);

      if (validate.length) {
        return res.status(400).json({
          status: "error",
          message: validate,
        });
      }
      // Check If User Exist && Password is Correct
      const user = await User.findOne({ email }).select("+password");

      const correct = await user.correctPassword(password, user.password);

      if (!user || !correct) {
        return next(new AppErr("Incorrect Email or Password", 401));
      }
      res.status(200).json({
        status: "success",
        message: `Success Login`,
      });
    } catch (err) {
      res.status(err.status).json({
        status: err.status,
        message: err.message,
      });
    }
  },
};
