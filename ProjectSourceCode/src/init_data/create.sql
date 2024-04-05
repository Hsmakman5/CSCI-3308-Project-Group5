drop table if EXISTS users;
CREATE TABLE users (
        user_id INT PRIMARY KEY NOT NUll,
        username VARCHAR(50) PRIMARY KEY,
        password CHAR(60) NOT NULL
);

drop table if EXISTS movies;
CREATE TABLE movies (
        movie_id INT PRIMARY KEY NOT NUll,
        movie_name = VARCHAR(100) NOT NUll,
        duration SMALLINT NOT NUll,
        language VARCHAR(30) NOT NUll,
);


drop table if EXISTS movie_recs;
CREATE TABLE movie_recs (
        movie_rec_id INT PRIMARY KEY NOT NUll,
        weather VARCHAR(30) NOT NUll,
        mood VARCHAR(30) NOT NUll,
        time_of_day VARCHAR(30) NOT NUll,
        likes SMALLINT NOT NULL
);

drop table if EXISTS movies_to_movie_recs;
CREATE TABLE movies_to_movie_recs(
        movie_id INT NOT NUll,
        movie_rec_id INT NOT NUll
);

drop table if EXISTS users_to_movie_recs;
CREATE TABLE movies_to_movie_recs(
        user_id INT NOT NUll,
        movie_rec_id INT NOT NUll
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