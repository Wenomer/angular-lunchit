require('../module');

exports.apply = function(app) {
    require('./routes').apply(app);
};