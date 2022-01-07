const mysql = require("mysql");

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
  save: (finnish, english, category) => {
    function funkkari(resolve, reject) {
      console.log(finnish, english, category)
      connection.query(
        `INSERT INTO dictionary (finnish, english, category) Values(?, ?, ?)`,
        [finnish, english, category ],
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
      connection.query(`SELECT * FROM dictionary`, (err, allLocations) => {
        if (err) {
          reject(err);
        } else {
          resolve(allLocations);
        }
      });
    }
    return new Promise(funkkari);
  },
    findCategory: (category) => {
    function funkkari(resolve, reject) {
      connection.query(`SELECT * FROM dictionary WHERE category = "${category}"`, (err, allLocations) => {
        if (err) {
          reject(err);
        } else {
          resolve(allLocations);
        }
      });
    }
    return new Promise(funkkari);
  },
  deleteById: (id) => {
    function funkkari(resolve, reject) {
      connection.query(`DELETE FROM dictionary WHERE category = ${category} AND id = ?`, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    }
    return new Promise(funkkari);
  },
  findById: (category, id) => {
    function funkkari(resolve, reject) {
      connection.query(
        `SELECT * FROM dictionary WHERE category = ${category} AND id = ?`,
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
