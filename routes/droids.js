const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: all droids
  // RETURN: json object
  // ACCCESS: public
  router.get("/", (req, res) => {
    const queryString = `
    SELECT droids.* FROM droids
    LEFT OUTER JOIN purchases ON droid_id = droids.id
    WHERE droid_id IS NULL;
    `;
    db.query(queryString)
      .then((data) => {
        const droids = data.rows;
        res.json({ droids });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET: droid by manufacturer
  // RETURN: json object
  // ACCESS: public

  // GET: droid by model
  // RETURN: json object
  // ACCESS: public

  // GET: droid by price
  // RETURN: json object
  // ACCESS: public

  return router;
};
