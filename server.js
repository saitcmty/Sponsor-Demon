let mongoose = require( "mongoose" );
let express = require( "express" );
let morgan = require( "morgan" );
let uuid = require("uuid");

let bodyParser = require( "body-parser" );
let jsonParser = bodyParser.json();

mongoose.Promise = global.Promise;

let {Users} = require('./models/user-model');

let {DATABASE_URL, PORT} = require('./config');

let app = express();

app.use(express.static("public"));
app.use(morgan("dev"));
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

// Code goes here


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