var User = require('../models/user.js');
var Release = require('../models/release.js');
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
        Release.get(function(err, result) {
            console.log('首页:'+result);
            res.render('home/index', {
                title: '知乎-首页',
                list: result
            });
        });

    });
    // 登录页面
    app.get('/login', checkNotLogin);
    app.get('/login', function(req, res) {
        res.render('user/login', {
            title: '用户登陆 - 宜趣网'
        });
    });
    // 登录接口
    app.post('/login', checkNotLogin);
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
    app.get('/logout', checkLogin);
    app.get('/logout', function(req, res) {
        console.log('登出接口:' + JSON.stringify(req.session));
        if (req.session.user) {
            req.session.user = null;
            res.redirect('/');
        }
    });
    // 注册页面
    app.get('/reg', checkNotLogin);
    app.get('/reg', function(req, res) {
        res.render('user/register', {
            title: '用户注册 - 宜趣网'
        });
    });
    // 注册接口
    app.post('/reg', checkNotLogin);
    app.post('/reg', function(req, res) {
        console.log('注册接口');
        var username = req.body['username'];
        var repeat_username = req.body['repeat-username'];
        var password = req.body['password'];
        console.log('username:' + username + ',repeat_username:' + repeat_username + ',password:' + password);
        if (username == '') {
            req.flash('error', '请输入用户名');
            return res.redirect('/reg');
        }
        if (repeat_username == '') {
            req.flash('error', '请再次输入用户名');
            return res.redirect('/reg');
        }
        if (password == '') {
            req.flash('error', '请输入密码');
            return res.redirect('/reg');
        }
        if (repeat_username !== username) {
            req.flash('error', '两次用户名输入不一致');
            return res.redirect('/reg');
        }

        //生成口令的散列值
        var md5 = crypto.createHash('md5');
        var password = md5.update(password).digest('base64');
        var newUser = new User({
            username: username,
            repeat_username: repeat_username,
            password: password
        });
        //检查用户名是否已经存在
        User.get(newUser.username, function(err, user) {
            if (user) {
                req.flash('error', '用户已存在请重新输入');
                return res.redirect('/reg');
            }
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            //如果不存在则新增用户
            newUser.save(function(err) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/reg');
                }
                req.session.user = newUser;
                console.log('注册成功');
                req.flash('info', '注册成功');
                res.redirect('/');
            });
        });
    });

    //发布页面
    app.get('/release', function(req, res) {
        res.render('admin/release', {
            title: "内容发布页面"
        });

    });

    //发布接口
    app.post('/release', function(req, res) {
        var title = req.body['release-title'];
        var content = req.body['release-content'];
        if (title == '') {
            req.flash('error', '请输入标题');
            return res.redirect('/reg');
        }
        if (content == '') {
            req.flash('error', '请输入发布内容');
            return res.redirect('/reg');
        }
        var release = new Release({
            title: title,
            content: content
        });
        console.log('发布接口');
        release.save(function(err, result) {
            if (err) {
                req.flash('err', err);
                return res.redirect('/release');
            }
            console.log('发布成功');
            req.flash('info', '发布成功');
            res.redirect('/release');
        });

    });
};
