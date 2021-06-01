const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    return console.log('Cookies', req.cookies);
  })

  return router;
};
