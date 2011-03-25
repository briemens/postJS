/*globals exports, console*/
var innerRoutes = {};

exports.add = function (routes) {
	var url;
	for (url in routes) {
		if (routes.hasOwnProperty(url)) {
			innerRoutes[url] = routes[url];
		}
	}
};

exports.resolve = function (url, callback) {
	var route = innerRoutes[url];
	callback(route === undefined ? "Route for Url '" + url + "' not found" : undefined, route);
};

exports.handle = function (request, callback) {
	exports.resolve(request.url, function (err, route) {
		if (err) {
			callback(err, undefined);
		} else {
			route(function (err, data) {
				if (err) {
					callback(err, undefined);
				}
				if (data === undefined || typeof data === "string") {
					data = data;
				} else if (typeof data === "object") {
					data = JSON.stringify(data);
				} else {
					err = ("Unknown route type '" + typeof data + "' for Url '" + request.url + "'");
				}
				callback(err, data);
			});
		}
	});
};