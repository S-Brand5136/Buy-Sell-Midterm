const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: all users from users table
  // RETURN: json object
  // ACCESS: public
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET: user by id
  // RETURN: json object containing user
  // ACCESS: public
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM users WHERE id = $1;`, [req.params.id])
      .then((data) => {
        const user = data.rows;
        return res.json({ user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET all favourites for user with id
  router.get('/:id/favourites', (req, res) => {
    const userId = req.params.id;
    const queryString = `
    SELECT
      droids.id as droid_id,
      droids.name,
      droids.description,
      droids.price,
      droids.sold_out as sold_out,
      manufacturer,
      model,
      image_url,
      date_posted,
      favourites.id as fav_id,
      sold_price,
      users.name as sellers_name,
      email as sellers_email
    FROM favourites
    INNER JOIN droids ON droids.id = favourites.droid_id
    LEFT JOIN purchases ON droids.id = purchases.droid_id
    INNER JOIN users ON users.id = droids.sellers_id
    INNER JOIN images ON droids.id = images.droids_id AND images.is_primary = true
    WHERE favourites.user_id = $1;
    `;
    db.query(queryString, [userId])
      .then((result) => {
        return res.json(result.rows);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({error: 'Internal server errror'});
      });
  });

  // Add droid with did (droid id) to user with id's favourites list
  router.post('/:id/favourites', (req, res) => {
    console.log(req.body);
    const { droidId } = req.body;
    const userId = req.params.id;
    const queryString = 'INSERT INTO favourites (droid_id, user_id) VALUES ($1, $2) RETURNING *;';
    db.query(queryString, [droidId, userId])
      .then((result) => {
        return res.status(201).json(result.rows[0]);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({error: 'Internal server error'});
      });
  });

  // Remove the droid with did from favourites list for user with id
  router.delete('/:id/favourites/:did', (req, res) => {
    const { id: userId, did: droidId } = req.params;
    const queryString = 'DELETE FROM favourites WHERE user_id = $1 AND droid_id = $2;';
    db.query(queryString, [userId, droidId])
      .then((result) => {
        res.status(204).json();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({error: 'Internal server error'});
      });
  });

  return router;
};
