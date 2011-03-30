/*jslint nomen:false */
/*globals require, exports, __dirname */
var fs = require("fs"), data;

exports.getAllPosts = function (callback) {
	if (data === undefined) {
		fs.readFile(__dirname + "/data.json", function (err, result) {
			data = JSON.parse(result);
			callback(err, data);
		});
	} else {
		callback(undefined, data);
	}
};

exports.addPost = function (post) {
	exports.getAllPosts(function (err, data) {
		data.push(post);
		fs.writeFile(__dirname + "/data.json", JSON.stringify(data));
	});
};