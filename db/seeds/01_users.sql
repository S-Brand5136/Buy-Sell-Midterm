-- Users table seeds here (Example)
INSERT INTO users (avatar_url, email, is_admin, mobile_phone, name, password)
VALUES ('images/user_avatars/Star-wars-clip-art-free-download-yoda.gif', 'yoda@jedi.force', TRUE, '555-555-5555', 'Yoda', 'Password!'),
('images/user_avatars/Star-wars-clip-art-images-R2D2.gif', 'r2d2@rebellion.org', TRUE, '555-555-2222', 'R2-D2', 'Password!'),
('images/users_avatars/watto-img.jpg', 'watto5@tatooine.com', false, '555-289-3764', 'Watto', 'Password!');

INSERT INTO users (email, mobile_phone, name, password)
VALUES ('anakin@jedi.force', '555-555-2222', 'Anakin Skywalker', 'Password!'),
('cybotAdmin@cybotGalactica.com', '555-289-8754', 'Cybot Galactica', 'Password!'),
('baktoid@combat.automata', '555-666-1598', 'Baktoid Combat Automata', 'Password!');
