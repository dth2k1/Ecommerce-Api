const express = require("express");
const morgan = require("morgan");

const logError = require("../middleware/error");
module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (process.env.NODE_ENV === "production") {
    app.use(morgan("dev"));
  }
  app.use("/", require("../routers/Router"));
  app.use(logError);
};
