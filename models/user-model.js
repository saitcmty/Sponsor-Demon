let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema ({

	id 						:		{type: String, require: true},
	name 					:		{type: String, require: true},
	email 				:		{type: String, require: true},
	password 			:		{type: String, require: true},
	logged				: 	{type: Boolean, require: false},
});

let User = mongoose.model('users', userSchema);

let Users = {
	
	get: function(){
		return User.find().then(users => {
			return users;
		}).catch(error => {
			throw Error(error);
		});
	},

	post: function(createdUser) {
		return User.create(createdUser).then(user => {
			return user;
		}).catch(error => {
			throw Error(error);
		});
	},

	update: function(updatedUser) {
		return User.updateOne({email:updatedUser.email}, updatedUser).then(user => {
			return user;
		}).catch(error => {
			throw Error(error);
		});
	},

	delete: function(userId) {
		return User.findOneAndRemove({id:userId}).then(user => {
			return user;
		}).catch(error => {
			throw Error(error);
		});
	}
};

module.exports = {Users};