const express = require("express");
const multer = require("multer");
const { v4 } = require("uuid");

const router = express.Router();

// Set up multer for handling image uploads
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/droid_images');
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').splice(-1)[0];
    const fileName = `${v4()}.${extension}`;
    req.imageFileName = fileName;
    cb(null, fileName);
  }
});
const imgUpload = multer({storage: fileStorageEngine});

module.exports = (db) => {
  // GET: all droids w/ params if needed
  // RETURN: json object
  // ACCCESS: public
  router.get("/", (req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const queryParams = [limit, offset];
    let queryString = `
    SELECT droids.*, images.image_url FROM droids
    JOIN images ON droids.id = images.droids_id
    LEFT OUTER JOIN purchases ON purchases.droid_id = droids.id
    WHERE purchases.droid_id IS NULL `;

    if(req.query.keyword) {
      queryParams.push(`%${req.query.keyword.toLowerCase()}%`);
      queryString += `AND LOWER(description) LIKE $${queryParams.length} `;
    }

    if (req.query.manufacturer) {
      queryParams.push(`%${req.query.manufacturer.toLowerCase()}%`);
      queryString += `AND LOWER(manufacturer) LIKE $${queryParams.length} `;
    }

    if (req.query.model) {
      queryParams.push(`%${req.query.model.toLowerCase()}%`);
      queryString += `AND LOWER(model) LIKE $${queryParams.length} `;
    }

    if (req.query.minimum_price) {
      queryParams.push(req.query.minimum_price);
      queryString += `AND price >= $${queryParams.length} `;
    }

    if (req.query.maximum_price) {
      queryParams.push(req.query.maximum_price);
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

  // POST: droid to page if admin
  // RETURN: droid json object
  // ACCESS: private
  router.post("/", imgUpload.single('image_url'), (req, res) => {
    const { title, description, price, manufacturer, model, userId } = req.body;
    const image_url = `../images/droid_images/${req.imageFileName}`;

    // Query for saving to droids table
    const queryParamsDroid = [userId, title, description, price, manufacturer, model];

    // Throw error if any required params are empty
    if([...queryParamsDroid, image_url].every(x => !x)) {
      throw 'Input fields cannot be empty';
    }

    const queryStringDroid = `
      INSERT INTO droids (sellers_id, name, description, price, manufacturer, model)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;

    // Query for saving to images table
    const queryParamsImage = [];
    const queryStringImage = `
      INSERT INTO images (droids_id, is_primary, image_url)
      VALUES ($1, true, $2) RETURNING *;
    `;

    // Insert droid into DB
    db.query(queryStringDroid, queryParamsDroid)
      .then((data) => {
        // Need droid id from inserting droid before inserting image.
        queryParamsImage.push(data.rows[0].id, image_url);
        return db.query(queryStringImage, queryParamsImage);
      })
      .then((data) => {
        const droid_id = data.rows[0].droids_id;
        return res.status(201).json({droid_id});
      })
      .catch((err) => {
        console.log(err);
        return res.status(403).json({Error: 'Failed to create new Droid'})
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
    SELECT image_url, is_primary, images.id
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
        return res.json(result);
      })
      .catch(err => console.error(err));
  });

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const queryString = 'DELETE FROM droids WHERE id = $1';
    db.query(queryString, [id])
      .then((result) => {
        return res.status(204).json();
      })
      .catch((err) => {
        console.error(err);
      });
  });

  // GET: Users droid listings
  // RETURN: Json object
  // Access: currently public
  router.get("/admin/:id", (req, res) => {
    const id = req.params.id;
    const queryString = `
    SELECT DISTINCT droids.*, images.*, users.email as sellers_email, users.name as sellers_name
    FROM droids
    JOIN images ON droids_id = droids.id
    JOIN users ON droids.sellers_id = users.id
    WHERE droids.sellers_id = $1 AND images.is_primary = TRUE;`
    const queryParams = [id]

    db.query(queryString, queryParams)
      .then((data) => {
        res.status(200).send(data.rows)
      })
      .catch((err) => {
        res.status(404).send({Error: err})
      });
  });

  // GET: droid by manufacturer
  // RETURN: json object
  // ACCESS: public
  router.get("/manufacturer/:manufacturer", (req, res) => {
    let limit = req.body.limit || 10;
    let offset = req.body.offset || 0;
    const searchTerm = `%${req.query.manufacturer.toLowerCase()}%`;
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
    const searchTerm = `%${req.query.model.toLowerCase()}%`;
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

//
// to do: Image saving. Right now it just
// takes in a url from online and serves it back
//


  return router;
};
