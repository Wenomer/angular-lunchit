var fs = require('fs');
//var _ = require('underscore');

global.$ = {
	controller: function(name) {
		return require('./controllers/' + name + '.js');
	},

	ajax: function(name) {
		return require('./ajax/' + name);
	},

	config: function(name) {
		if (path.existsSync('./configs/ ' + name + '.js'))
			return require('./configs/' + name);

		return require('../configs/' + name);
	},

	lib: function(name) {
		if (fs.existsSync('./lib/ ' + name + '.js'))
			return require('./lib/' + name);

		return require('../lib/' + name);
	},

	component: function(name) {
		if (fs.existsSync('./components/ ' + name + '.js'))
			return require('./components/' + name).create();

		return require('../components/' + name).create();
	},

	beforeAction: function(req, res, next) {
		req.app.set('views', __dirname + '/views');
		req.app.locals({
			req: req,
			title: null
//			_ : _
		});
		next();
	}
};