const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true,

      min: 5,
      max: 255,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 26,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.hideInfomation = function () {
  const user = this; //method an thong tin nguoi dung password va token
  const userhide = user.toObject();
  delete userhide.password;
  return userhide;
};
userSchema.methods.generateToken = function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      admin: user.admin,
    },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
  return token;
};
userSchema.statics.findUserAndAuth = function (email, password) {
  const user = User.findOne({ email: email });
  if (!user) {
    throw new Error("can not find user ");
  }
  const decryptPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.SECRET_KEY
  ).toString();
  if (password !== decryptPassword) {
    throw new Error("Password is not correct");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
