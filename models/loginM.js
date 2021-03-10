const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await enCode.compare(candidatePassword, userPassword);
};

module.exports = Mongoose.model("User", userSchema);
