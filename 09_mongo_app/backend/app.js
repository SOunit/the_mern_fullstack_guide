const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const keys = require("./env");

const app = express();

// parse json data
app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  // check if response is already send or not by previous middleware
  if (res.headerSent) {
    return next(error);
  }

  // something went wrong = 500
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

mongoose
  .connect(
    `mongodb+srv://${keys.mongo_user}:${keys.mongo_password}@cluster0.r27pb.mongodb.net/${keys.mongo_db_name}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(5000);
