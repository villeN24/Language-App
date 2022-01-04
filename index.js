require("dotenv").config();
const cors = require("cors");
const express = require("express");
const pool = require("./database/functions.js");
const app = express();
const port = 8080;
const locations = require(`./routes/locations.js`);

app.use(express.json());
app.use(cors());
app.use(`/`, locations);

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

const shutdown = () => {
  console.log("Closing server.");
  server.close(() => {
    console.log("Server closed.");
    pool.end(() => {
      process.exit(0);
    });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
