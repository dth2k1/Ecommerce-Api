module.exports = function (req, res, next) {
  if (!req.user.admin) return res.status(400).send("Access Denied");
  next();
};
