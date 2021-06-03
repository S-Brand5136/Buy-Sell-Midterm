const fs = require('fs').promises;
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
    WHERE purchases.droid_id IS NULL
    AND sold_out = false `;

    if (req.query.keyword) {
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
    if ([...queryParamsDroid, image_url].every(x => !x)) {
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
        return res.status(403).json({Error: 'Failed to create new Droid'});
      });
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    const queryString1 = `
    SELECT droids.*, users.name as sellers_name, email, favourites.id as fav_id
    FROM droids
    JOIN users ON users.id = sellers_id
    LEFT JOIN favourites ON favourites.user_id = users.id
    WHERE droids.id = $1;
    `;
    const queryString2 = `
    SELECT image_url, is_primary, images.id
    FROM images
    JOIN droids ON droids.id = droids_id
    WHERE droids.id = $1;
    `;
    const droid = db.query(queryString1, [id]);
    const images = db.query(queryString2, [id]);

    Promise.all([droid, images])
      .then((data) => {
        if (!data || !data[0] || data[0].rows.length === 0) {
          return res.json({ error: `There is no droid with id ${id}`});
        }
        const result = { ...data[0].rows[0] };
        result.images = data[1].rows;
        return res.json(result);
      })
      .catch(err => console.error(err));
  });

  // Delete a droid from db, and delete its images from file storage.
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const queryStringGetImageUrl = `
      SELECT *
      FROM images
      JOIN droids ON droids.id = droids_id
      WHERE droids.id = $1;
    `;
    const queryStringDelete = 'DELETE FROM droids WHERE id = $1';

    db.query(queryStringGetImageUrl, [id])
      .then((data) => {
        if (!data.rows) {
          return 'No images';
        }
        const imageUrls = data.rows.map(x => x.image_url);
        const urlPromises = [];

        for (let i = 0; i < imageUrls.length; i++) {
          urlPromises[i] = fs.unlink(`./public/${imageUrls[i]}`);
        }

        // Delete droid from database.
        urlPromises.push(db.query(queryStringDelete, [id]));
        return Promise.all(urlPromises);
      })
      .then((result) => {
        // All good, return No Content
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
    SELECT droids.*, images.droids_id, image_url, users.email as sellers_email, users.name as sellers_name
    FROM droids
    JOIN images ON images.droids_id = droids.id AND images.is_primary = TRUE
    JOIN users ON droids.sellers_id = users.id
    WHERE droids.sellers_id = $1;`;
    const queryParams = [id];

    db.query(queryString, queryParams)
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(404).send({Error: err});
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

  // POST: droid to page if admin
  // RETURN: droid json object
  // ACCESS: private
  router.post("/create/:id", (req, res) => {
    console.log(req.body);
    const { title, description, price, manufacturer, model, image_url } = req.body;
    const userId = req.params.id;
    const queryParams = [userId, title, description, price, manufacturer, model];
    const queryString = `
      INSERT INTO droids (sellers_id, name, description, price, manufacturer, model)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    db.query(queryString, queryParams)
      .then((data) => {
        const newDroid = data.rows[0];
        return newDroid;
      })
      .then((data) => {
        const queryParams = [data.id, true, image_url];
        const queryString = `
          INSERT INTO images (droids_id, is_primary, image_url)
          VALUES ($1, $2, $3) RETURNING *;`;
        db.query(queryString, queryParams)
          .then((data) => {
            const droid_id = data.rows[0].droids_id;
            return res.status(200).json({droid_id});
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(403).json({Error: 'Failed to create new Droid'});
      });
  });

  // PUT: Update a droids sold_out value
  // RETURN: droid json Object
  // ACCESS: private
  router.put("/update/:id", (req, res) => {
    const soldOutUpdate = req.body.isSoldOut;
    const droidId = req.params.id;
    const queryString = `
      UPDATE droids
      SET sold_out = $1
      WHERE id = $2 RETURNING *;`;
    const queryParams = [soldOutUpdate, droidId];

    db.query(queryString, queryParams)
      .then((data) => {
        return res.status(200).json({msg: 'sucessfully updated'})
      })
      .catch((err) => {
        console.log(err);
        return res.status(403).json({Error: err})
      })

  });


  return router;
};
