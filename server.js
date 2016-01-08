// Babel ES6/JSX Compiler
require('babel-register');

var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');
var xml2js = require('xml2js');
var _ = require('underscore');

var config = require('./config');
var routes = require('./app/routes');
var User = require('./models/user');
var Plan = require('./models/plan');

var app = express();

// 首先引入 cookie-parser 这个模块
var cookieParser = require('cookie-parser');
// 首先引入 express-session 这个模块
var session = require('express-session');
var redisStore = require('connect-redis')(session);

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));

// 使用 cookieParser 中间件，cookieParser(secret, options)
// 其中 secret 用来加密 cookie 字符串（下面会提到 signedCookies）
// options 传入上面介绍的 cookie 可选参数
app.use(cookieParser());


app.use(session({
  // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
  // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
  // 编写自己的 store 也很简单
  store: new redisStore(),
  secret: 'somesecrettoken'
}));

app.get('/', function (req, res) {
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send('欢迎第一次来这里');
  }
});
/**
添加用户
**/
app.post('/api/users', function(req, res, next) {
  async.waterfall([
    function(callback) {
      var data = {
        UserName : req.body.name,
        PassdWord : req.body.passdword
      };
      User.findOne({ name: data.UserName }, function(err, user) {
        if (err) return next(err);
        if (user) {
          return res.status(409).send({ message: user.name + ' is already in the database.' });
        }
        callback(err, data);
      });
    },
    function(data) {
      var user = new User({
        name: data.UserName,
        passdword: data.PassdWord,
        rank: '1'
      });

      user.save(function(err) {
        if (err) return next(err);
        res.send({ message: data.UserName + ' has been added successfully!' });
      });
    }
  ]);
});

/**
添加计划
**/
app.post('/api/plans', function(req, res, next) {
  async.waterfall([
    function(callback) {
      var data = {
        Name : req.body.name,
        Content : req.body.content
      };
      Plan.findOne({ name: data.Name }, function(err, plan) {
        if (err) return next(err);
        if (plan) {
          return res.status(409).send({ message: plan.name + ' is already in the database.' });
        }
        callback(err, data);
      });
    },
    function(data) {
      var plan = new Plan({
        name: data.Name,
        content: data.Content
      });

      plan.save(function(err) {
        if (err) return next(err);
        res.send({ message: data.Name + ' has been added successfully!' });
      });
    }
  ]);
});

/**
*获取用户列表
*/
app.get('/api/users', function(req, res, next) {

  User.find()
    .exec(function(err, users) {
      if (err) return next(err)
      return res.send(users);
    });
});

/**
*获取计划列表
*/
app.get('/api/plans', function(req, res, next) {

  Plan.find()
    .exec(function(err, plans) {
      if (err) return next(err)
      return res.send(plans);
    });
});

/**
*更新用户信息
*/
app.put('/api/users', function(req, res, next) {
  
  async.waterfall([
    function(callback) {
      var data = req.body;
      User.findOne({ name: data.name }, function(err, user) {
        if (err) return next(err);
        if (user) {
          return res.status(409).send({ message: user.name + ' is already in the database.' });
        }
        callback(err, data);
      });
    },
    function(data) {
      User.update({_id: data._id}, {
        $set: {name: data.name,passdword: data.passdword}
      }, function(err) {
          if(err){
              console.log(err)
              return
          }
      });
    }
  ]);

});

/**
删除用户
**/
app.get('/api/users/:id', function(req, res, next) {
  var id = req.params.id;

  User.findOne({ _id: id }, function(err, user) {
    if (err) return next(err);

    if (!user) {
      return res.status(404).send({ message: 'user not found.' });
    }

    if (user) {
      user.remove();
      return res.send({ message: user.name + ' has been deleted.' });
    }
  });
});

/**
验证用户，登陆
**/
app.post('/api/users/:name', function(req, res, next) {
  var name = req.params.name,
      passdword = req.body.passdword;
  User.findOne({ name: name }, function(err, user) {
    if (err) return next(err);

    if (!user) {
      return res.status(404).send({ message: '用户不存在.' });
    }
    if (user&&(user.passdword == passdword)) {
      res.cookie('_id', user._id, { maxAge: 1000 * 60 * 60 * 24 * 29});
      return res.send({ message: user.name + '登陆成功' });
    }else {
      return res.status(409).send({ message: '账户名或者密码错误.' });
    }
  });
});


app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = swig.renderFile('views/index.html', { html: html });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
