const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: all droids
  // RETURN: json object
  // ACCCESS: public
  router.get("/", (req, res) => {
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    const queryParams = [limit, offset];
    const queryString = `
    SELECT droids.* FROM droids
    LEFT OUTER JOIN purchases ON droid_id = droids.id
    WHERE droid_id IS NULL
    LIMIT $1
    OFFSET $2;
    `;
    db.query(queryString, queryParams)
      .then((data) => {
        const droids = data.rows;
        res.json({ droids });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Droids not found" });
      });
  });

  // GET: droid by manufacturer
  // RETURN: json object
  // ACCESS: public
  router.get("/manufacturer/:manufacturer", (req, res) => {
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    const searchTerm = `%${req.params.manufacturer.toLowerCase()}%`;
    const queryParams = [searchTerm, limit, offset];
    const queryString = `
    SELECT droids.* FROM droids
    LEFT OUTER JOIN purchases ON droid_id = droids.id
    WHERE droid_id IS NULL
    AND LOWER(manufacturer) LIKE $1
    LIMIT $2
    OFFSET $3;
    `;
    db.query(queryString, queryParams)
      .then((data) => {
        const droids = data.rows;
        res.json({ droids });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ error: "Droids not found" });
      });
  });

  // GET: droid by model
  // RETURN: json object
  // ACCESS: public
  router.get("/model/:model", (req, res) => {
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    const searchTerm = `%${req.params.model.toLowerCase()}%`;
    const queryParams = [searchTerm, limit, offset];
    const queryString = `
    SELECT droids.* FROM droids
    LEFT OUTER JOIN purchases ON droid_id = droids.id
    WHERE droid_id IS NULL
    AND LOWER(model) LIKE $1
    LIMIT $2
    OFFSET $3;
    `;
    db.query(queryString, queryParams)
      .then((data) => {
        const droids = data.rows;
        res.json({ droids });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ error: "Droids not found" });
      });
  });

  // GET: droid by price
  // RETURN: json object
  // ACCESS: public

  
  return router;
};
