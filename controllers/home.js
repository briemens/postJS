var fs = require("fs");

exports.routes = {
	'/': function index(callback) {
		fs.readFile("views/home/index.htm", function (err, data) {
			callback(err, "" + data);
		});
	}
};