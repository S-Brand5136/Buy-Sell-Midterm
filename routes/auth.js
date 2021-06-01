const express = require("express");
const router = express.Router();

module.exports = (db) => {

  // GET: log in to an account via id
  // ACCESS: Public
  // RETURNS: user object
  router.get("/:id", (req, res) => {
    // clear cookies
    res.clearCookie('userId');
    res.clearCookie('isAdmin');
    //grab userId from params and set query string
      const userId = req.params.id
      const queryString = 'SELECT * FROM users WHERE id = $1';

      db.query(queryString, [userId])
        .then((data) => {
          const user = data.rows[0];
          // check for user and set cookies
          if(user) {
            res.cookie('userId', userId);

            if(user.is_admin) {
              res.cookie('isAdmin', true);
            }

            return (res.status(200).json(user));
          } else {
            // if user not found
            return res.status(404).json({Error: 'This is not the user you are looking for'});
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({Error: err.message});
        })
  });

  // POST: clear cookies and logout user
  // ACCESS: public
  // RETURNS: json message
  router.post("/logout", (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('isAdmin');
    return res.status(200).json({msg: 'User succesfully logged out'});
  });

  return router;
};
