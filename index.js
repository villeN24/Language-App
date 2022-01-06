require("dotenv").config();
const cors = require("cors");
const express = require("express");
const pool = require("./database/functions.js");
const app = express();
const port = 8080;
const routePets = "pets";
const pets = require(`./routes/petsRoute.js`);
const routeColors = "colors";
const colors = require(`./routes/colorsRoute.js`);

app.use(express.json());
app.use(cors());
app.use(`/${routePets}`, pets);
app.use(`/${routeColors}`, colors);

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
