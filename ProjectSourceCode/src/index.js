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
    let query = "SELECT * FROM users WHERE username = $1"
    const user = await db.oneOrNone(query, req.body.username);
    if (!user) {
        res.redirect("/register");
        return;
    }
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






// Authentication Middleware.
const auth = (req, res, next) => {
    console.log("auth");
    console.log(req.session.user);
    if (!req.session.user) {
        // Default to login page.
        return res.redirect('/login');
    }
    next();
};


// Authentication Required
app.use(auth);

app.get('/home', (req, res) => {
    res.render('pages/home');
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('pages/logout');
})





// *****************************************************
// <!-- Section 5 : Start Server-->
// *****************************************************
// starting the server and keeping the connection open to listen for more requests

//app.listen(3000);
module.exports = app.listen(3000);
console.log('Server is listening on port 3000');