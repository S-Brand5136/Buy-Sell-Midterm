/*
 * All routes for retrieving or removing droids from featured list are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const queryString = `
    SELECT droids.id, droids.name droid_name, description, price, manufacturer, model, start_date, end_date, image_url, users.name as seller
    FROM featured_droids
    INNER JOIN droids ON droids.id = featured_droids.droid_id
    INNER JOIN images ON droids.id = images.droids_id AND images.is_primary = true
    INNER JOIN users ON users.id = sellers_id;
    `;
    db.query(queryString)
      .then(data => {
        const droids = data.rows;
        res.json({ droids });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

    // GET: droid by date, limit 4
  // RETURN: json object
  // ACCESS: public
  router.get("/new", (req, res) => {
    const queryString = `
    SELECT droids.*, images.image_url as image_url FROM droids
    LEFT OUTER JOIN purchases ON purchases.droid_id = droids.id
    JOIN images ON droids.id = images.droids_id
    WHERE purchases.droid_id IS NULL
    ORDER BY date_posted
    LIMIT 4;
    `;
    db.query(queryString)
      .then((data) => {
        const droids = data.rows;
        res.status(200).json(droids);
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ error: "Droids not found" });
      });
  });

  return router;
};
