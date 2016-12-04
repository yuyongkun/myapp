var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');

var flash = require('connect-flash');

var app = express();
var routes = require('./routes/route');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', ejs.__express); //app.set('view engine', 'ejs');
// app.set('env','production');  //设置为生产环境
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 数据库
app.use(session({
    secret: settings.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600 * 1000 * 24 //设置有效期为一天
    },
    store: new MongoStore({
        db: settings.db,
        host: "localhost",
        port: 28018
    })
}));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.info = req.flash('info');
    res.locals.username = req.session.user&&req.session.user.username;
    next();
});
routes(app);
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// 开发环境错误页面信息
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// 生产环境错误页面信息
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
