drop table if EXISTS users;
CREATE TABLE users (
        username VARCHAR(50) PRIMARY KEY,
        password VARCHAR(60) NOT NULL
);

drop table if EXISTS movies;
CREATE TABLE movies (
        movie_id INT KEY NOT NUll,
        movie_name VARCHAR(100) NOT NUll,
        url VARCHAR(100) NOT NULL,
        rating SMALLINT NOT NUll
);


drop table if EXISTS movie_recs;
CREATE TABLE movie_recs (
        movie_rec_id INT PRIMARY KEY NOT NUll,
        weather VARCHAR(30) NOT NUll,
        mood VARCHAR(30) NOT NUll,
        likes SMALLINT NOT NULL
);

drop table if EXISTS movies_to_movie_recs;
CREATE TABLE movies_to_movie_recs(
        movie_id INT NOT NUll,
        movie_rec_id INT NOT NUll
);

drop table if EXISTS users_to_movie_recs;
CREATE TABLE users_to_movie_recs(
        user_id INT NOT NUll,
        movie_rec_id INT NOT NUll
);

drop table if EXISTS weather;
CREATE TABLE weather_to_movies(
        weather_id INT PRIMARY KEY NOT NUll,
        weather_name VARCHAR(30) NOT NUll,
        related_genre VARCHAR(30) NOT NULL
);