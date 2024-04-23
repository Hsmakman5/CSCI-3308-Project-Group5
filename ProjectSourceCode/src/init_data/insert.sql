INSERT INTO movies (movie_id, movie_name, url)
VALUES
    ('475557', 'Joker', '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'),
    ('244786', 'Whiplash', '/7fn624j5lj3xTme2SgiLCeuedmO.jpg'),
    ('335977', 'Indiana Jones and the Dial of Destiny', '/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg'),
    ('157336', 'Interstellar', '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
    ('22794', 'Cloudy with a Chance of Meatballs', '/qhOhIKf7QEyQ5dMrRUqs5eTX1Oq.jpg'),
    ('24428', 'The Avengers', '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'),
    ('639933', 'The Northman', '/aSSJMnHknzKjlZ6zybwD7eyJ4Po.jpg');
 

INSERT INTO movie_recs (movie_rec_id, weather, mood)
VALUES
    ('1', 'Rainy', 'Sad'),
    ('2', 'Cloudy', 'Neutral'),
    ('3', 'Sunny', 'Happy'),
    ('4', 'Snow', 'Neutral'),
    ('5', 'Snow', 'Angry'),
    ('6', 'Cloudy', 'Happy'),
    ('7', 'Sunny', 'Happy');

INSERT INTO movies_to_movie_recs (movie_id, movie_rec_id)
VALUES
    ('475557','1'),
    ('244786', '2'),
    ('335977', '3'),
    ('157336','4'),
    ('639933','5'),
    ('22794', '6'),
    ('24428', '7');

