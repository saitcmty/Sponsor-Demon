let mongoose = require("mongoose");
let express = require("express");
let morgan = require("morgan");
let uuid = require("uuid");

let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

let {Users} = require('./models/user-model');
let {Disseminations} = require('./models/dissemination-model');

let {DATABASE_URL, PORT} = require('./config');

let app = express();

app.use(express.static("public"));
app.use(morgan("dev"));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.get('/users', (req, res, next) => {

	Users.get().then(User => {
		return res.status(200).json(User);
	}).catch(error => {
		return res.status(500).json({
			status : 500,
			message : "Something went wrong"
		});
	});	
});

app.post('/users', jsonParser, (req, res, next) => {

	let createdUser = {
		id 						:		uuid.v4(),
		name 					:		req.body.name,
		email 				:		req.body.email,
		password 			:		req.body.password,
		logged				: 	false,
		admin					: 	false,
	};

	Users.post(createdUser).then(user => {
		return res.status(201).json(user);
	}).catch(error => {
		return res.status(500).json({
			message: "Something went wrong with the DB",
			status: 500
		});
	});
});

app.get('/dissemination', jsonParser, (req, res, next) => {

	Disseminations.get().then(dissemination => {
		return res.status(200).json(dissemination);
	}).catch(error => {
		return res.status(500).json({
			message: "Something went wrong with the DB",
			status: 500;
		});
	});
});

app.post('/disseminations', jsonParser, (req, res, next) => {

	let createdDissemination = {

		id 						:		uuid.v4(),
		name 					: 	req.body.name,
		creator				: 	req.body.creator,
		message 			: 	req.body.message,
		companys 			: 	req.body.companys,
		ambassador 		: 	req.body.ambassador,
		stuff					: 	req.body.stuff
	};

	Disseminations.post(createdDissemination).then(dissemination => {
		return res.status(201).json(dissemination);
	}).catch(error => {
		return res.status(500).json({
			message: "Something went wrong with the DB",
			status: 200
		});
	});
});

app.put('/disseminations/:id', jsonParser, (req, res, next) => {
	
	Disseminations.update(req.body).then(dissemination => {
		return res.status(202).json(dissemination);
	}).catch(error => {
		return res.status(500).json({
			message: "Something went wrong with DB",
			status: 500
		});
	});
});

app.delete('/disseminations/:id', jsonParser, (req, res, next) => {

	Disseminations.delete(req.params.id).then(dissemination => {
		return res.status(201).json(dissemination);
	}).catch(error => {
		return res.status(500).json({
			message: "Something went wrong with DB",
			status: 500
		});
	});
});

let server;

function runServer(port, databaseUrl) {
	return new Promise((resolve, reject) => {
		
		mongoose.connect(databaseUrl, response => {
			
			if (response) {
				return reject(response);
			}

			else {
				
				server = app.listen(port, () => {
					console.log("App is running on port " + port);
					resolve();
				})
				
				.on('error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing the server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				else {
					resolve();
				}
			});
		});
	});
}

runServer(PORT, DATABASE_URL).catch(err => {
	console.log(err);
});