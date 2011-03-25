/*globals exports*/

exports.getAllPosts = function (callback) {
	var err, data = [
		{
			'url': 'http://nodejs.org',
			'title': 'NodeJS Homepage'
		},
		{
			'url': 'http://crafity.com',
			'title': 'Crafity Homepage'
		},
		{
			'url': 'http://jquery.com',
			'title': 'JQuery Homepage'
		},
		{
			'url': 'http://google.com/chrome',
			'title': 'Google Chrome Homepage'
		}
	];
	callback(err, data);
};