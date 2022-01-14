const express = require(`express`);
const { LONG } = require("mysql/lib/protocol/constants/types");
const connection = require("../database/functions");
const router = express.Router();
const unexpectedErr = `Serverside error occured.`;
const badReqErr = `Invalid request.`;
const category = `colors`;

/**
 * Router function to get all from table.
 *
 * Directs http get query from it´s url to fetch
 * everything from a database, and returns them.
 */
router.get(`/`, async (req, res) => {
  let allLocations;
  try {
    allLocations = await connection.findAll();
  } catch {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
  res.send(allLocations);
});
/**
 * Router function to get all categories.
 *
 * Directs http get query from it´s url to fetch
 * every unique value from column "category", and
 * returns them.
 */
router.get(`/unique`, async (req, res) => {
  let allLocations;
  try {
    allLocations = await connection.getCategories();
  } catch {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
  res.send(allLocations);
});
/**
 * Router function to find all in a category.
 *
 * Directs http get query from it´s url to
 * fetch every row with the given category, and
 * returns them.
 */
router.get(`/:category`, async (req, res) => {
  let allLocations;
  try {
    console.log(req.body);
    allLocations = await connection.findCategory(req.params.category);
  } catch {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
  res.send(allLocations);
});
/**
 * Router function to delete by id.
 *
 * Directs a http delete query from it´s url to
 * delete a row from a database table with given
 * id, and returns OK.
 */
router.delete(`/:id([0-9]+)`, async (req, res) => {
  try {
    let foundLocation = await connection.findById(req.params.id);
    if (foundLocation !== null) {
      await connection.deleteById(req.params.id);
      res.status(204).send();
    } else {
      res.status(404).send({
        msg: "Cannot find resource with ID of " + req.params.id + ".",
      });
    }
  } catch (err) {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
/**
 * Router function to add a new row.
 *
 * Directs a http post query from it´s url to
 * add a new row to a database table with
 * given information.
 */
router.post(`/`, async (req, res) => {
  try {
    connection.save(
      req.body.payload.finnish,
      req.body.payload.english,
      req.body.payload.swedish,
      req.body.payload.category
    );
  } catch (err) {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
/**
 * Router function to edit an existing row.
 *
 * Directs a http patch query from it´s url to
 * edit a row from a database table with given
 * id and information.
 */
router.patch(`/`, async (req, res) => {
  try {
    connection.editEntry(
      req.body.payload.id,
      req.body.payload.finnish,
      req.body.payload.english,
      req.body.payload.swedish,
      req.body.payload.category
    );
  } catch (err) {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
module.exports = router;
