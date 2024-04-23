drop table if EXISTS users;

CREATE TABLE
        users (
                user_id SERIAL PRIMARY KEY NOT NULL,
                username VARCHAR(50) NOT NULL,
                password VARCHAR(60) NOT NULL
        );

drop table if EXISTS movies;

CREATE TABLE
        movies (
                movie_id INT NOT NUll PRIMARY KEY,
                movie_name VARCHAR(100) NOT NUll,
                url VARCHAR(100) NOT NULL
        );

drop table if EXISTS movie_recs;

CREATE TABLE
        movie_recs (
                movie_rec_id SERIAL PRIMARY KEY NOT NULL,
                weather VARCHAR(30) NOT NUll,
                mood VARCHAR(30) NOT NUll,
                watch_date DATE NOT NULL DEFAULT CURRENT_DATE
        );

drop table if EXISTS movies_to_movie_recs;

CREATE TABLE
        movies_to_movie_recs (movie_id INT NOT NUll, movie_rec_id INT NOT NUll);

drop table if EXISTS users_to_movie_recs;

CREATE TABLE
        users_to_movie_recs (user_id INT NOT NUll, movie_rec_id INT NOT NUll);

