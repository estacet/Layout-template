const express = require("express");
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/public'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected");
});

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
});

/////////////////User registration
app.post('/auth', function (request, response) {
    if (!request.body) return response.sendStatus(400);
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    let created = new Date();
    if (name && password && email) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            connection.query('INSERT INTO accounts (name, email, password, created) VALUES (?,?,?,?)', [name, email, hash, created], function (err, data) {
                if (err) return console.log(err);
                response.redirect("/");
            });
        });
    }});

////////////////Subscription to newsletter
app.post("/subscribe", function (request, response) {
    if (!request.body) return response.sendStatus(400);
    let email = request.body.email;
    if (email) {
        connection.query('INSERT INTO newsletter (email) VALUES (?)', [email], function (err, data) {
            if (err) return console.log(err);
            response.redirect("/");
        });
    }});

app.listen(3000, () => console.log('Server is running on http://127.0.0.1:3000'));