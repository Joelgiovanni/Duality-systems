const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
var path = require("path");
require("dotenv").config();

// Initialize app()
app = express();

db = require("./config/Keys").URI;

var router = require("./routing/routes");

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Mlab is connected!"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
// Passport config
require("./passport/passport")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cors set up for cross Domain requests
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true // enable set cookie
  })
);

// Routes / Router
app.use("/auth", router);

/*Adds the react production build to serve react requests*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
