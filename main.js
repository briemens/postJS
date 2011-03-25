/*global require, console */

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