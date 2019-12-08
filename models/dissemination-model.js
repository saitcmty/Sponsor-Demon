let mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let disseminationSchema = mongoose.Schema({
	
	id					: 		{type: String, require: true},
	name				: 		{type: String, require: true},
	creator			: 		{type: String, require: true}, 		
	message			: 		{type: String, require: false},
	companys		: 		{type: [String], require: false},
	ambassador	: 		{type: [String], require: false},
	stuff				: 		{type: String, require: false}
});

let Dissemination = mongoose.model('disseminations', disseminationSchema);

let Disseminations = {

	get: function() {
		return Dissemination.find().then(disseminations => {
			return disseminations;
		}).catch(error => {
			throw Error(error);
		});
	},

	post: function(createdDissemination) {
		return Dissemination.create(createdDissemination).then(dissemination => {
			return dissemination;
		}).catch(error => {
			throw Error(error);
		});
	},

	update: function(updatedDissemination) {
		return Dissemination.updateOne({id:updatedDissemination.id}, updatedDissemination).then(dissemination => {
			return dissemination;
		}).catch(error => {
			throw Error(error);
		});
	},

	delete: function(idDissemination) {
		return Dissemination.findOneAndRemove({id:idDissemination}).then(dissemination => {
			return dissemination;
		}).catch(error => {
			throw Error(error);
		})
	}
};

module.exports = {Disseminations};