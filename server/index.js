const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

// Express router
const truyenCV = require('./routes/truyencv');

// Create an Express application
const app = express();

// Configure app's port
const port = process.env.PORT || 7070;
app.set('port', port);

// Load middlewares
app.use(logger('dev'));

// Body Parser Middleware
app.use(bodyParser.json());

// CORS Middleware
app.use(function(req, res, next) {
    // Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization'
    );
    next();
});

// Start the server and listen on the port above
app.listen(port, () => console.log(`Server is listening on port ${port}`));

// RESTful API
app.use('/api/truyencv', truyenCV);
