const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const upload = require('./api/upload/upload');
const login = require('./api/login/login');
const signup = require('./api/signup/signup');
const product = require('./api/product/product');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//routes for api
app.use('/upload', upload);
app.use('/login', login);
app.use('/signup', signup);
app.use('/product', product);
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status  = 404;
    next(error);
})
app.use((error,req,res,next) => {
    res.status = error.status || 500;
    res.json({
        error : {
            message : error.message
        }
    });
})
module.exports = app;
