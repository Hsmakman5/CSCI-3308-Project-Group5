Table users {
  id integer [primary key],
  username varchar,
  password varchar,
  likes varchar
}

Table movies {
  id integer [primary key],
  name varchar,
  genre varchar,
  weather varchar
}

Table users_to_movies {
  movie_id int,
  user_id int
}