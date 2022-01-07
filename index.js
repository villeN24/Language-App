require("dotenv").config();
const cors = require("cors");
const express = require("express");
const pool = require("./database/functions.js");
const app = express();
const port = 8080;
const routeDictionary = "dictionary";
const dictionary = require(`./routes/dictRoute.js`);

app.use(express.json());
app.use(cors());
app.use(`/${routeDictionary}`, dictionary);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  pool.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection formed.");
    }
  });
});
