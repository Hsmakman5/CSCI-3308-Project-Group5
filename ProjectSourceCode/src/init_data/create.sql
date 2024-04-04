drop table if EXISTS users;
CREATE TABLE users (
        username VARCHAR(50) PRIMARY KEY,
        password CHAR(60) NOT NULL
);



-- Table users {
--   id integer [primary key],
--   username varchar,
--   password varchar,
--   likes varchar
-- }

-- Table movies {
--   id integer [primary key],
--   name varchar,
--   genre varchar,
--   weather varchar
-- }

-- Table users_to_movies {
--   movie_id int,
--   user_id int
-- }