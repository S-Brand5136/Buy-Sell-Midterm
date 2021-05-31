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
  return router;
};
