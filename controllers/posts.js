var repository = require('../repository');

exports.routes = {
	'/getAllPosts': function getAllPosts(callback) {
		repository.getAllPosts(callback);
	},
	'/post': function post(callback) {
		callback(undefined, "Thanks for your contribution");
	}
};