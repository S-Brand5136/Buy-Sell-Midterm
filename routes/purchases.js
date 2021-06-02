const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const buyerId = req.query.buyer;
    const values = [];
    let queryString = `
    SELECT purchases.*, droids.name, droids.sold_out as sold_out, manufacturer, model, users.name as sellers_name, email, image_url
    FROM purchases
    INNER JOIN droids ON droid_id = droids.id
    INNER JOIN users ON users.id = purchases.seller_id
    INNER JOIN images ON images.droids_id = droids.id AND is_primary = true
    `;

    if (buyerId) {
      queryString += 'WHERE buyer_id = $1;';
      values.push(buyerId);
    } else {
      queryString += ';';
    }

    db.query(queryString, values)
      .then((result) => {
        return res.json(result.rows);
      })
      .catch((err) => {
        console.error(err.message);
        return res.status(500).json({error: 'Internal server error'});
      });

  });

  return router;
};
