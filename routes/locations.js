var express = require(`express`);
const connection = require("../database/functions");
var router = express.Router();
var unexpectedErr = `Serverside error occured.`;
var badReqErr = `Invalid request.`;
// const Validator = require("jsonschema").Validator;
// const validator = new Validator();

router.use((req, res, next) => {
  console.log(`Logged`);
  next();
});

// GET ALL EMPTY
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

// FIND ALL, FILTER BY LAT, FILTER BY LONG
router.get(`/locations`, async (req, res) => {
  let allLocations;
  try {
    let x = Number(req.query.x);
    let y = Number(req.query.y);
    if (Number(req.query.lat) === 1) {
      allLocations = await connection.findAllFilterLat(x, y);
    } else if (Number(req.query.lat) === 0) {
      allLocations = await connection.findAllFilterLong(x, y);
    }
  } catch {
    res.status(400).send({
      msg: badReqErr,
    });
  }
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
router.get(`/locations/:id([0-9]+)`, async (req, res) => {
  try {
    let foundLocation = await connection.findById(req.params.id);
    if (foundLocation === null) {
      res.status(404).send({
        msg: "Cannot find resource with ID of " + req.params.id + ".",
      });
    } else {
      res.send(foundLocation);
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
// POST
router.post(`/locations`, async (req, res) => {
  try {
    const schema = {
      type: "object",
      properties: {
        latitude: {
          type: "integer",
          maximum: 90,
          minimum: 0,
        },
        longitude: {
          type: "integer",
          maximum: 180,
          minimum: 0,
        },
      },
    };

    const validation = validator.validate(req.body, schema);
    if (validation.errors.length > 0) {
      res.status(400).send(validation.errors);
    } else {
      let saveResult = await connection.save(
        req.body.latitude,
        req.body.longitude
      );
      res.status(200).send({
        msg: saveResult,
      });
    }
  } catch {
    res.status(500).send({
      msg: unexpectedErr,
    });
  }
});

module.exports = router;
