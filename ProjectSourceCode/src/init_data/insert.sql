
INSERT INTO weather (weather_id, weather_name, related_genre);
    ('1', 'Sunny', 'Comedy'),
    ('2', 'Raining', 'Romance'),
    ('3', 'Cloudy', 'Drama'),
    ('4', 'Foggy', 'Science Fiction'),
    ('5', 'Thunderstorms', 'Horror'),
    ('6', 'Snowing', 'History'),
    ('7', 'Extreme', 'Action');

INSERT INTO movies (movie_id, movie_name, url, rating);
    ('475557', 'Joker', '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', '8.162' ),
    ('244786', 'Whiplash', '/7fn624j5lj3xTme2SgiLCeuedmO.jpg', '8.382'),
    ('335977', 'Indiana Jones and the Dial of Destiny', '/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg', '6.6'),
    ('157336', 'Interstellar', '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', '8.433'),
    ('22794', 'Cloudy with a Chance of Meatballs', '/qhOhIKf7QEyQ5dMrRUqs5eTX1Oq.jpg', '6.614'),
    ('24428', 'The Avengers', '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg', '7.714'),
    ('639933', 'The Northman', '/aSSJMnHknzKjlZ6zybwD7eyJ4Po.jpg', '7.066');

INSERT INTO movie_recs (movie_rec_id, weather, mood, likes);
    ('1', 'Rainy', 'Sad','0'),
    ('2', 'Cloudy', 'Neutral', '0'),
    ('3', 'Sunny', 'Happy', '0'),
    ('4', 'Other/Extreme', 'Neutral', '0'),
    ('5', 'Other/Extreme', 'Angry', '0'),
    ('6', 'Cloudy', 'Happy', '0'),
    ('7', 'Sunny', 'Happy', '0');

INSERT INTO movies_to_movie_recs (movie_id, movie_rec_id);
    ('475557','1'),
    ('244786', '2'),
    ('335977', '3'),
    ('157336','4'),
    ('639933','5'),
    ('22794', '6'),
    ('24428', '7');

