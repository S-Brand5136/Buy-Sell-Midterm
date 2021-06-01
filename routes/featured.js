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

  return router;
};
