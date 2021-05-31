const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: all droids w/ params if needed
  // RETURN: json object
  // ACCCESS: public
  router.get("/", (req, res) => {
    const limit = req.body.limit || 10;
    const offset = req.body.offset || 0;
    const queryParams = [limit, offset];
    let queryString = `
    SELECT droids.* FROM droids
    LEFT OUTER JOIN purchases ON droid_id = droids.id
    WHERE droid_id IS NULL `;

    if (req.body.manufacturer) {
      queryParams.push(`%${req.body.manufacturer.toLowerCase()}%`);
      queryString += `AND LOWER(manufacturer) LIKE $${queryParams.length} `;
    }

    if (req.body.model) {
      queryParams.push(`%${req.body.model.toLowerCase()}%`);
      queryString += `AND LOWER(model) LIKE $${queryParams.length} `;
    }

    if (req.body.minimum_price) {
      queryParams.push(req.body.minimum_price);
      queryString += `AND price >= $${queryParams.length} `;
    }

    if (req.body.maximum_price) {
      queryParams.push(req.body.maximum_price);
      queryString += `AND price <= $${queryParams.length} `;
    }

    queryString += `LIMIT $1
    OFFSET $2;`;

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

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const queryString1 = `
    SELECT droids.*, users.name as sellers_name, email
    FROM droids
    INNER JOIN users ON users.id = sellers_id
    WHERE droids.id = $1;
    `;
    const queryString2 = `
    SELECT image_url, is_primary
    FROM images
    INNER JOIN droids ON droids.id = droids_id
    WHERE droids.id = $1;
    `;
    const droid = db.query(queryString1, [id]);
    const images = db.query(queryString2, [id]);

    Promise.all([droid, images])
      .then((data) => {
        if (!data || !data[0] || data[0].rows.length === 0) {
          return res.json({ error: `There is no droid with id ${id}`});
        }
        const result = { ...data[0].rows[0] }
        result.images = data[1].rows
        res.json(result);
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

  // POST: droid to page if admin
  // RETURN: droid json object
  // ACCESS: private

  // PUT: update droid if owner
  // RETURN: updated droid json object
  // ACCESS: private

  // DELETE: droid if owner
  // RETURN: JSON success message
  // ACCESS: private

  return router;
};
