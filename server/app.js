const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const morgan = require("morgan");
const Logger = require('./services/logger_services')
const logger = new Logger('app')

const app = express();


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);


app.use(function(req,res,next){
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use(function(error, req, res, next){
    
    res.status(error.status || 500);
    logger.error("not found"),{
        "status":404
    }
});

app.listen(3000, function() {
    logger.info("APP LAUNCHED IN PORT 3000")
})

