require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const pool = require("./database/functions.js");
const app = express();
const routeDictionary = "dictionary";
const dictionary = require(`./routes/dictRoute.js`);

let port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(`/${routeDictionary}`, dictionary);
app.use(express.static(path.join(__dirname, "frontend/build")));

/**
 * The server of the project.
 */
const server = app.listen(port, () => {
  console.log(`Listening at ${server.address().port}`);
  pool.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection formed.");
    }
  });
});
