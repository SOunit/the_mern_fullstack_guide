const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

// app.use(bodyParser);

app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
  // check if response is already send or not by previous middleware
  if (res.headerSent) {
    return next(error);
  }

  // something went wrong = 500
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured." });
});

app.listen(5000);
