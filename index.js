// imports
const express = require("express");
const morgan = require('morgan')
const mysql = require('mysql2');

// settions
const app = express();
app.set('port', process.env.port || 5000)

// middlewares
app.use(morgan('dev'))
app.use(express.json())

// routesss
app.get('/api/account', (req, res) => {

    var connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    });

    connection.connect(function (err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }

        console.log('Connected as id ' + connection.threadId);
    });

    connection.query('SELECT * FROM account', function (error, results, fields) {
        if (error)
            throw error;
        res.json(results)
    });

    connection.end();
})

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})