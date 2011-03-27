/*global require, console */
//require.paths.unshift('/usr/local/lib/node');

var express = require('express');
var app = express.createServer();

app.configure('dev', function () {
	app.use(express.logger());
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack:true
	}));
});
app.configure('prod', function () {
	app.use(express.logger());
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack:true
	}));
});

app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.set("view options", {layout:true});

app.get('/', function(req, res) {
	//throw new Error("Error check!");
	//res.send('hello world');
	res.render("home/index");
});

app.listen(3000);

(function () {
	return;

	var util = require('util'),
		http = require('http'),
		router = require('./router');

	(function bootstrapper() {
		router.add(require('./controllers/posts').routes);
		router.add(require('./controllers/home').routes);

		http.createServer(
			function (request, response) {
				router.handle(request, function(err, data) {
					if (err) {
						response.writeHeader(500);
						response.end("" + err);
					} else if (data !== undefined) {
						response.writeHeader(200, { 'contentType': 'application/json' });
						response.end(data);
					} else {
						response.writeHeader(404);
						response.end();
					}
				});

			}).listen(2020, '127.0.0.1');

		console.log('Listening on 127.0.0.1:2020');
	}());

}());
