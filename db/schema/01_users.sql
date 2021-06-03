-- Drop and recreate Users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  avatar_url VARCHAR(255) DEFAULT 'images/user_avatars/default-avatar.jpg',
  email VARCHAR(255) NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  mobile_phone VARCHAR(50) NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL DEFAULT NOW()
);
