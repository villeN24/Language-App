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
  save: (finnish, english, swedish, category) => {
    function funkkari(resolve, reject) {
      console.log(
        `[LOG] Inserting fin:${finnish} eng:${english} swe:${swedish} category:${category}`
      );
      console.log(finnish, english, category);
      connection.query(
        `INSERT INTO dictionary (finnish, english, swedish, category) Values(?, ?, ?, ?)`,
        [finnish, english, swedish, category],
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
      console.log(`[LOG] Finding all`);
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
      console.log(`[LOG] Finding all in category:${category}`);
      connection.query(
        `SELECT * FROM dictionary WHERE category = ?`,
        [category],
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
      console.log(`[LOG] Deleting id:${id}`);
      connection.query(`DELETE FROM dictionary WHERE id = ?`, [id], (err) => {
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
      console.log(`[LOG] Finding id ${id}`);
      connection.query(
        `SELECT * FROM dictionary WHERE id = ?`,
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
  editEntry: (id, finnish, english, swedish, category) => {
    function funkkari(resolve, reject) {
      console.log(`[LOG] Editing entry ${id}`);
      connection.query(
        `UPDATE dictionary SET finnish = ?, english = ?, swedish = ?, category= ? WHERE id = ?;`,
        [finnish, english, swedish, category, id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Entry succesfully edited.");
          }
        }
      );
    }
    return new Promise(funkkari);
  },
  getCategories: () => {
    function funkkari(resolve, reject) {
      console.log(`[LOG] Finging unique categories`);
      connection.query(
        `SELECT distinct category FROM dictionary;`,
        (err, allCategories) => {
          if (err) {
            reject(err);
          } else {
            resolve(allCategories);
          }
        }
      );
    }
    return new Promise(funkkari);
  },
};

module.exports = connectionFunctions;
