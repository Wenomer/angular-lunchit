
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , less = require('less-middleware')
  , passport = require('passport');

global.Schemas = require('./models').Schemas;

var app = express();

// all environments
app.set('port', process.env.PORT || 3004);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('234jg645!!khj'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(less({
    src : path.join(__dirname, 'public', 'less'),
    dest : path.join(__dirname, 'public', 'css'),
    prefix : '/css'
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./configs/envs/dev').apply(app);

require('./configs/bootstrap').apply(app);
require('./app/configs/bootstrap.js').apply(app);
require('./api/configs/bootstrap.js').apply(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
