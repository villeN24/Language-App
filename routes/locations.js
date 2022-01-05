var express = require(`express`);
const connection = require("../database/functions");
var router = express.Router();
var unexpectedErr = `Serverside error occured.`;
var badReqErr = `Invalid request.`;

router.use((req, res, next) => {
  console.log(`Logged`);
  next();
});

// GET ALL EMPTY
router.get(`/words`, async (req, res) => {
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

// FIND by ID
router.get(`/words/:id([0-9]+)`, async (req, res) => {
  try {
    let foundLocation = await connection.findById(req.params.id);
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
router.delete(`/locations/:id([0-9]+)`, async (req, res) => {
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

module.exports = router;
