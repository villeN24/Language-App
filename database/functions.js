const mysql = require("mysql");
let tableName = "test";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  connect: () => {
    function funkkari(resolve, reject) {
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Connected.");
        }
      });
    }
    return new Promise(funkkari);
  },
  close: () => {
    function funkkari(resolve, reject) {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Query completed, closing connection.");
        }
      });
    }
    return new Promise(funkkari);
  },
  save: (userInput1, userInput2) => {
    function funkkari(resolve, reject) {
      connection.query(
        `INSERT INTO locations (latitude,longitude) Values(?, ?)`,
        [userInput1, userInput2],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Entry succesfully added.");
          }
        }
      );
    }
    return new Promise(funkkari);
  },
  findAll: () => {
    function funkkari(resolve, reject) {
      connection.query(`SELECT * FROM ${tableName}`, (err, allLocations) => {
        if (err) {
          reject(err);
        } else {
          resolve(allLocations);
        }
      });
    }
    return new Promise(funkkari);
  },
  findAllFilterLat: (x, y) => {
    function funkkari(resolve, reject) {
      console.log(x, y);
      connection.query(
        "SELECT * FROM locations WHERE latitude BETWEEN ? AND ?",
        [x, y],
        (err, allLocations) => {
          if (err) {
            reject(err);
          } else {
            resolve(allLocations);
          }
        }
      );
    }
    return new Promise(funkkari);
  },
  findAllFilterLong: (x, y) => {
    function funkkari(resolve, reject) {
      console.log(x, y);
      connection.query(
        "SELECT * FROM locations WHERE longitude BETWEEN ? AND ?",
        [x, y],
        (err, allLocations) => {
          if (err) {
            reject(err);
          } else {
            resolve(allLocations);
          }
        }
      );
    }
    return new Promise(funkkari);
  },
  deleteById: (id) => {
    function funkkari(resolve, reject) {
      connection.query("DELETE FROM locations WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    }
    return new Promise(funkkari);
  },
  findById: (id) => {
    function funkkari(resolve, reject) {
      connection.query(
        "SELECT * FROM locations WHERE id = ?",
        [id],
        (err, foundLocation) => {
          if (err) {
            reject(err);
          } else if (foundLocation.length < 1) {
            resolve(null);
          } else {
            resolve(foundLocation);
          }
        }
      );
    }
    return new Promise(funkkari);
  },
};

module.exports = connectionFunctions;
