const mysql = require("mysql");

/** An object to create a connection to database. */
const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
});

let connectionFunctions = {
  /** A function to establish a connection to a database. */
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
  /** A function to close the connection to the database */
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
  /**
   * A function to save a new entry to the database table.
   *
   * A function to add a new row to a database table with
   * given parameters, with character escaping.
   *
   * @param {string} finnish - Value to be inserted to the finnish column.
   * @param {string} english - Value to be inserted to the english column.
   * @param {string} swedish - Value to be inserted to the swedish column.
   * @param {string} category - Value to be inserted to the category column.
   * @returns - A promise to allow async syntax
   */
  save: (finnish, english, swedish, category) => {
    function funkkari(resolve, reject) {
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
  /**
   * A function to get everything from a database table.   *
   * @returns - A promise to allow async syntax.
   */
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
  /**
   * A function to delete a row from a database table.
   *
   * Deletes a certain row from a database table with
   * given id, includes character escaping.
   *
   * @param {number} id - The value of the row to be deleted.
   * @returns - A promise to allow async syntax.
   */
  deleteById: (id) => {
    function funkkari(resolve, reject) {
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
  /**
   * A function to find a row from a database table.
   *
   * Finds a certain row from a database table with given
   * id, and returns it.
   * @param {number} id - The value of the row to be found.
   * @returns - A promise to allow async syntax.
   */
  findById: (id) => {
    function funkkari(resolve, reject) {
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
  /**
   * A function to edit the values of a certain row of a database table.
   *
   * Edits a certain row from a database table with
   * given id and values. Includes character
   * escaping.
   *
   * @param {number} id - Value of the row to be edited.
   * @param {string} finnish - Value to be inserted to the finnish column.
   * @param {string} english - Value to be inserted to the finnish column.
   * @param {string} swedish - Value to be inserted to the finnish column.
   * @param {string} category - Value to be inserted to the finnish column.
   * @returns - A promise to allow async syntax.
   */
  editEntry: (id, finnish, english, swedish, category) => {
    function funkkari(resolve, reject) {
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
  /**
   * A function to get all unique categories.
   *
   * Gets all unique categories from a database
   * table, and returns them.
   *
   * @returns - A promise to allow async syntax.
   */
  getCategories: () => {
    function funkkari(resolve, reject) {
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
