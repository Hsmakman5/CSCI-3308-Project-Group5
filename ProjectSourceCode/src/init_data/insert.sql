INSERT INTO movies (movie_id, movie_name, url)
VALUES
    (475557, 'Joker', '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg'),
    (244786, 'Whiplash', '/7fn624j5lj3xTme2SgiLCeuedmO.jpg'),
    (335977, 'Indiana Jones and the Dial of Destiny', '/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg'),
    (157336, 'Interstellar', '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg'),
    (22794, 'Cloudy with a Chance of Meatballs', '/qhOhIKf7QEyQ5dMrRUqs5eTX1Oq.jpg'),
    (24428, 'The Avengers', '/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'),
    (639933, 'The Northman', '/aSSJMnHknzKjlZ6zybwD7eyJ4Po.jpg');
 

INSERT INTO movie_recs (movie_rec_id, weather, mood)
VALUES
    (991, 'rain', 'sad'),
    (992, 'cloudy', 'neutral'),
    (993, 'sunny', 'happy'),
    (994, 'rain', 'neutral'),
    (995, 'snow', 'mad'),
    (996, 'cloudy', 'happy'),
    (997, 'sunny', 'happy');

INSERT INTO movies_to_movie_recs (movie_id, movie_rec_id)
VALUES
    (475557, 991),
    (244786, 992),
    (335977, 993),
    (157336, 994),
    (639933, 995),
    (22794 , 996),
    (24428 , 997);

