DROP TABLE IF EXISTS featured_droids CASCADE;

CREATE TABLE featured_droids (
  id SERIAL NOT NULL PRIMARY KEY,
  droid_id INTEGER NOT NULL REFERENCES droids(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);