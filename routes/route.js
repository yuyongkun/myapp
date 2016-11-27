var User = require('../models/user.js');
var crypto = require('crypto')
module.exports = function(app) {
    // 检查用户没有登录跳转到登录页面
    function checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        next();
    }

    // 检测用户已登录跳转到首页
    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.redirect('/');
        }
        next();
    }

    //首页
    app.get('/', function(req, res) {
        console.log('首页');
        res.render('home/index', {
            title: '宜趣网-首页'
        });
    });
    // 登录页面
    app.get('/login', function(req, res) {
        res.render('user/login', {
            title: '用户登陆 - 宜趣网'
        });
    });
    // 登录接口
    app.post('/login', function(req, res) {
        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var password = md5.update(req.body.password).digest('base64');
        var username = req.body.username;
        if (username == '') {
            req.flash('error', '请输入用户名');
            return res.redirect('/login');
        }
        if (password == '') {
            req.flash('error', '请输入密码');
            return res.redirect('/login');
        }
        User.get(username, function(err, user) {
            console.log('登入接口:' + JSON.stringify(user));
            if (err) {
                console.log('err:' + err);
                req.flash('error', err);
                return res.redirect('/login');
            }
            if (!user) {
                req.flash('error', '用户不存在');
                return res.redirect('/login');
            }
            if (user.password != password) {
                req.flash('error', '密码错误');
                return res.redirect('/login');
            }
            req.session.user = user;
            res.redirect('/')
        });
    });
    // 登出接口
    app.get('/logout', function(req, res) {
        console.log('登出接口:' + JSON.stringify(req.session));
        if (req.session.user) {
            req.session.user = null;
            res.redirect('/');
        }
    });
    // 注册页面
    app.get('/reg', function(req, res) {
        res.render('user/register', {
            title: '用户注册 - 宜趣网'
        });
    });
    // 注册接口
    app.post('/reg', function(req, res) {
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
        User.get(newUser.username, function(err, user) {
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
            newUser.save(function(err) {
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
                }); //res.send(req.body);
            });
        });
    });

    //工具发布页面
    app.get('/release', checkLogin);
    app.get('/release', function(req, res) {
        res.render('tool/release', {
            title: '消息上传-宜趣网',
            username: req.session.user ? req.session.user.username : null
        });
    });
};
