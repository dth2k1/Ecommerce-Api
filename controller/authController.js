const _ = require("lodash");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const CryptoJS = require("crypto-js");
const register = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User registed");
  user = new User(_.pick(user, ["username", "email", "password"]));
  user.password = await CryptoJS.AES.encrypt(
    user.password,
    process.env.SECRET_KEY
  ).toString();
  const userHide = user.hideInfomation();
  await userHide.save();
  const token = user.generateToken();
  res
    .header("token-auth", token)
    .send(_.pick(user, ["_id", "username", "email"]));
});
const auth = asyncHandler(async (req, res) => {
  const user = await User.findUserAndAuth(req.body.email, req.body.password);
  const token = user.generateToken();
  res.send({ user, token });
});

module.exports = {
  register,
  auth,
};
