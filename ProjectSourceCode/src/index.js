// *****************************************************
// <!-- Section 1 : Import Dependencies -->
// *****************************************************

const express = require('express'); // To build an application server or API
const app = express();
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const pgp = require('pg-promise')(); // To connect to the Postgres DB from the node server
const bodyParser = require('body-parser');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.
const bcrypt = require('bcrypt'); //  To hash passwords
const axios = require('axios'); // To make HTTP requests from our server. We'll learn more about it in Part C.
const { hasSubscribers } = require('diagnostics_channel');
const { error } = require('console');

// *****************************************************
// <!-- Section 2 : Connect to DB -->
// *****************************************************

// create `ExpressHandlebars` instance and configure the layouts and partials dir.
const hbs = handlebars.create({
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

// database configuration
const dbConfig = {
    host: 'db', // the database server
    port: 5432, // the database port
    database: process.env.POSTGRES_DB, // the database name
    user: process.env.POSTGRES_USER, // the user account to connect with
    password: process.env.POSTGRES_PASSWORD, // the password of the user account
};

const db = pgp(dbConfig);

// test your database
db.connect()
    .then(obj => {
        console.log('Database connection successful'); // you can view this message in the docker compose logs
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

// *****************************************************
// <!-- Section 3 : App Settings -->
// *****************************************************

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); // specify the usage of JSON for parsing request body.
app.use(express.static(__dirname));
// initialize session variables
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
    })
);

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const user = {
    username: undefined,
    password: undefined,
    id: undefined
};

// *****************************************************
// <!-- Section 4 : API Routes -->
// *****************************************************

app.get('/welcome', (req, res) => {
    res.json({ status: 'success', message: 'Welcome!' });
});


app.get('/', (req, res) => {
    res.redirect('/login'); //this will call the /login route in the API
});
app.get('/login', (req, res) => {
    res.render('pages/login'); //this will call the /login route in the API
});
app.get('/register', (req, res) => {
    res.render('pages/register');
});

//api route for profile page
app.get('/profile', (req, res) => {
    res.render('pages/profile');
});


app.post('/register', async (req, res) => {
    //hash the password using bcrypt library
    const hash = await bcrypt.hash(req.body.password, 10);

    if (hash.err) {
        console.log(hash.err);
    } else {
        let query = "INSERT INTO users (username, password) VALUES ($1, $2)"
        db.oneOrNone(query, [req.body.username, hash]).then((data) => {
            res.status(200);
            res.redirect('/login');
        }
        ).catch(err => {
            res.render('pages/register', {
                error: true,
                message: "Invalid Input"
            })

            res.status(400);

        });
    }
});

app.post('/login', async (req, res) => {
    /* I switched this to the await querey below becasue it was crashing when I tried to login -Henry
    let query = "SELECT * FROM users WHERE username = $1"
    const user = await db.oneOrNone(query, req.body.username);
    if (!user) {
        res.redirect("/register");
        return;
    }
    */


    await db.one(`SELECT * FROM users WHERE username = $1 LIMIT 1`, [req.body.username])
        .then(function (data) {
            user.username = data.username;
            user.password = data.password;
            user.id = data.user_id;
            // console.log("Username match")

        })
        .catch(function (err) {
            console.log(err);
            res.render('pages/register', {
                error: true,
                message: 'Username not found',
            });

        }
        )


    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        res.render('pages/login', {
            error: true,
            message: "Incorrect username or password"
        })
    }
    else {
        req.session.user = user;
        req.session.save();
        res.redirect("/home");
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('pages/logout');
});




// Authentication Middleware.
const auth = (req, res, next) => {
    // console.log("auth");
    // console.log(req.session.user);
    if (!req.session.user) {
        // Default to login page.
        return res.redirect('/login');
    }
    next();
};





// Authentication Required
app.use(auth);

app.get('/home', (req, res) => {
    res.render('pages/home', {
        user: req.session.user
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('pages/logout');
})


let movieAddMessage = undefined;

app.get('/addMovieRec', async (req, res) => {
    axios({
        url: req.query.search ? `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US` : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc',
        method: 'GET',
        dataType: 'json',
        headers: {
            'Authorization': process.env.API_KEY,
            'accept': 'application/json',
        },
        params: {
            query: req.query.search,
            page: 1,
        },
    })
        .then(results => {
            // console.log(results.data._embedded.events);
            // the results will be displayed on the terminal if the docker containers are running // Send some parameters
            console.log();

            if (movieAddMessage) {
                res.render('pages/addMovieRec', {
                    user: req.session.user,
                    movies: results.data.results,
                    error: false,
                    message: movieAddMessage

                });
            }
            else {
                res.render('pages/addMovieRec', {
                    user: req.session.user,
                    movies: results.data.results
                });

            }

        })
        .catch(error => {
            console.log(error)
            res.render('pages/addMovieRec', {
                user: req.session.user,
                events: []
            })
        });

})
app.post('/addMovieRec', async (req, res) => {
    const movie_id = parseInt(req.body.id);


    const addMovie = "INSERT INTO movies (movie_id, movie_name, url) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING"
    const movieRec = "INSERT INTO movie_recs (weather, mood, watch_date) VALUES ($1, $2, $3) RETURNING movie_rec_id"
    const addUsersToTovieRecs = "INSERT INTO users_to_movie_recs (user_id, movie_rec_id) VALUES ($1, $2)"
    const addMoviesToMovieRecs = "INSERT INTO movies_to_movie_recs (movie_id, movie_rec_id) VALUES ($1, $2)"

    const data = await db.task(task => {
        return task.batch([
            task.none(addMovie, [movie_id, req.body.movie_name, req.body.url]),
            task.one(movieRec, [req.body.weather, req.body.mood, req.body.watch_date]),
        ])
    })

    db.task(task => {
        return task.batch([
            task.none(addUsersToTovieRecs, [req.session.user.id, data[1].movie_rec_id]),
            task.none(addMoviesToMovieRecs, [movie_id, data[1].movie_rec_id])
        ])
    }).then(() => {
        movieAddMessage = "Succsesfully added " + req.body.movie_name + " to watched movies";
        res.redirect(req.get('referer'));
    })

});

app.get('/watchedMovies', (req, res) => {

    const query = "SELECT *, TO_CHAR(watch_date, 'dd/mm/yyyy') FROM users INNER JOIN users_to_movie_recs ON users.user_id = users_to_movie_recs.user_id INNER JOIN movie_recs ON users_to_movie_recs.movie_rec_id = movie_recs.movie_rec_id INNER JOIN movies_to_movie_recs ON movie_recs.movie_rec_id = movies_to_movie_recs.movie_rec_id INNER JOIN movies ON movies_to_movie_recs.movie_id = movies.movie_id WHERE users.user_id = $1 ORDER BY watch_date DESC"
    //const query = "SELECT * FROM users_to_movie_recs"
    db.manyOrNone(query, req.session.user.id).then((data) => {
        res.render("pages/watchedMovies", {
            user: req.session.user,
            movies: data
        })
    })


})






// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests

//app.listen(3000);
module.exports = app.listen(3000);
console.log('Server is listening on port 3000');