const express = require(`express`);
const connection = require("../database/functions");
const router = express.Router();
const unexpectedErr = `Serverside error occured.`;
const badReqErr = `Invalid request.`;
const category = `colors`;

router.use((req, res, next) => {
  console.log(`[Log] Dictionary route`);
  next();
});

// GET ALL EMPTY
router.get(`/`, async (req, res) => {
  console.log(`[Log] Find all`);
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
router.get(`/:category`, async (req, res) => {
  console.log(`[Log] Find by category`);
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

// FIND by ID
router.get(`/:id([0-9]+)`, async (req, res) => {
  try {
    let foundLocation = await connection.findById(tableName, req.params.id);
    if (foundLocation === null) {
      res.status(404).send({
        msg: "Cannot find resource with ID of " + req.params.id + ".",
      });
    } else {
      res.send(foundLocation[0]);
    }
  } catch (err) {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});
// DELETE by ID
router.delete(`/:id([0-9]+)`, async (req, res) => {
  console.log(`[LOG] In router delete`);
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
//
router.post(`/`, async (req, res) => {
  connection.save(
    req.body.payload.finnish,
    req.body.payload.english,
    req.body.payload.category
  );
});

module.exports = router;