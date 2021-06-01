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
    // TODO: Implement Me
    const userId = req.params.id;
    const queryString = `
    SELECT
      droids.id,
      droids.name,
      droids.description,
      droids.price,
      manufacturer,
      model,
      date_posted,
      favourites.id as fav_id,
      sold_price,
      users.name as sellers_name,
      email as sellers_email
    FROM droids
    LEFT JOIN purchases ON droids.id = purchases.droid_id
    INNER JOIN favourites ON droids.id = favourites.droid_id
    INNER JOIN users ON users.id = droids.sellers_id
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
  router.post('/:id/favourites/:did', (req, res) => {
    // TODO: Implement Me
    res.status(204).json();
  });

  // Remove the droid with did from favourites list for user with id
  router.delete('/:id/favourites/:did', (req, res) => {
    // TODO: Implement Me
    res.status(204).json();
  });

  return router;
};
