require('./errors');

exports.apply = function(app) {
	require('./routes').apply(app);
};