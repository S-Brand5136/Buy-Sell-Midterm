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
    SELECT droids.*, sellers_id, start_date, end_date
    FROM featured_droids
    INNER JOIN droids ON droids.id = droid_id;
    `;
    db.query(queryString)
      .then(data => {
        const featuredDroids = data.rows;
        res.json({ featuredDroids });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
