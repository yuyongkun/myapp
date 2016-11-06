var User = require('../models/user.js');
var crypto = require('crypto')
module.exports = function (app) {
    // 检测用户登陆状态
    function checkLogin(req, res, next) {
        console.log("checkLogin---->" + req.session);
        if (!req.session.user) {
            return res.redirect('/login');
        }
        next();
    }

    // 检测用户登陆状态
    function checkLogOut(req, res, next) {
        console.log("checkLogOut--->" + JSON.stringify(req.session));
        var username = '';
        if (!req.session.user) {
            username = ''
        } else {
            username = req.session.user.username
        }
        next();
    }

    //首页
    app.get('/', function (req, res) {
        console.log('首页');
        res.render('home/index', {
            title: '宜趣网-首页',
            username:req.session.user?req.session.user.username:null
        });
    });
    // 登入
    app.get('/login', function (req, res) {
        console.log('登入');
        res.render('user/login', {
            title: '用户登陆 - 宜趣网'
        });
    });
    // 登入接口
    app.post('/doLogin', function (req, res) {
        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        console.log('登入接口:' + JSON.stringify(req.body));
        User.get(req.body.username, function (err, user) {
            console.log('登入接口:' + JSON.stringify(user));
            if (!user) {
                res.json({
                    info: '用户不存在',
                    status: false
                });
                return;
            }
            if (user.password != password) {
                res.json({
                    info: '密码错误',
                    status: false
                });
                return;
            }
            req.session.user = user;
            res.json({
                info: '登陆ok',
                status: true
            });
//            res.redirect('http://localhost:8080');
        });
    });
    // 登出接口
    app.get('/doLogout', function (req, res) {
        console.log('登出-session:' + JSON.stringify(req.session));
        if (req.session.user) {
            req.session.user = null;
            console.log('登出成功');
            res.redirect('/');
        }
    });
    // 注册
    app.get('/reg', function (req, res) {
        console.log('注册');
        res.render('user/register', {
            title: '用户注册 - 宜趣网'
        });
    });
    // 注册接口
    app.post('/doReg', function (req, res) {
        var username = req.body['username'];
        var email = req.body['email'];
        var password = req.body['password'];
        if (username == '') {
            res.json({
                info: '用户名不能为空',
                status: false
            });
            return;
        }
//        if (email == '') {
//            res.json({
//                info: '邮箱不能为空',
//                status: false
//            });
//            return;
//        }
        if (password == '') {
            res.json({
                info: '密码不能为空',
                status: false
            });
            return;
        }
        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var password = md5.update(password).digest('base64');
        var newUser = new User({
            username: username,
            password: password
        });
        //检查用户名是否已经存在
        User.get(newUser.username, function (err, user) {
            if (user) {
                res.json({
                    info: '用户名已存在',
                    status: false
                });
                return;
            }
            if (err) {
                res.json({
                    info: err,
                    status: false
                });
                return;
            }
            //如果不存在则新增用户
            newUser.save(function (err) {
                if (err) {
                    res.json({
                        info: err,
                        status: false
                    });
                    return;
                }
                req.session.user = newUser;
                console.log('注册接口-session:' + JSON.stringify(req.session));
                res.json({
                    info: '注册成功',
                    status: true
                });  //res.send(req.body);
            });
        });
    });
    // 用户中心
    app.get('/user/user_center', checkLogin);
    app.get('/user/user_center', function (req, res) {
        console.log('用户中心');
        res.render('user/user_center', {
            title: '用户中心-宜趣网',
            user: req.session.user,
            username: req.session.user.name
        });
    });
    //工具发布页面
    app.get('/tool/release', checkLogin);
    app.get('/tool/release', function (req, res) {
        res.render('tool/release', {
            title: '消息上传-宜趣网',
            username:req.session.user?req.session.user.username:null
        });
    });
};
