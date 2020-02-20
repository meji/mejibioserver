require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const  cors = require('cors');
const fileupload = require("express-fileupload");


const app = express();
require("./passport/config")(app);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileupload());
app.use(express.static(__dirname + '../uploads'));
//Para cross domain:
app.use(cors());

app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'views'));
app.engine('jsx', require('express-react-views').createEngine());

app.use('/', require('./routes'));


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
mongoose
    .connect(`${process.env.MONGODB_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Base de datos conectada"))
    .catch(() => {
        console.log(error)
        throw error;
    });
mongoose.set('useFindAndModify', false);

module.exports = app;
