var acl = {
	auth: function(UserModel){
		return function(req, res, next) {
			if (req.session.user._id) {
				UserModel.findOne({
					_id: req.session.user._id
					}, function(err, user){
					if (!err)
						req.user = user;
					next();
				});
			} else {
				req.user = {};
				next();
			}
		};
	},

	allow: function(role) {
		return function(req, res, next) {
			if(role == "*"){
				next();
				return true;
			}

			if(!req.user){
				res.redirect('/login');
				return false;
			}

			if (req.user.username == 'admin') {
                    next();
			} else {
				req.user = {};
				res.redirect('/login');
			}
		};
	}
};

exports.acl = acl;
exports.create = function() {
	return acl;
};