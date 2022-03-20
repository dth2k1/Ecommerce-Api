const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("token-auth");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_KEY);
    req.body = decodeToken;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};
