/*jslint nomen:false */
/*global require, console, __dirname */

var express = require('express');
var app = express.createServer();
var sys = require('sys');
var css = require('stylus');
var repository = require('./repository');
var str = require('fs').readFileSync(__dirname + '/styles/postjs.styl', 'utf8');
var io = require('socket.io');

app.configure('dev', function () {
	app.use(express.logger());
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});
app.configure('prod', function () {
	app.use(express.logger());
	app.use(express.errorHandler({
		dumpExceptions: false,
		showStack: false
	}));
});

app.use(express.bodyParser());
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.set("view options", { layout: true });

app.get('/', function (req, res) {
	res.render("home/index");
});

app.post('/post', function (req, res) {
	if (req.body.title === undefined || req.body.url === undefined) {
		throw new Error("Invalid data");
	}
	repository.addPost(req.body);
	res.send('Thanks a bunch!');
});


app.get('/getAllPosts', function (req, res) {
	repository.getAllPosts(function (err, posts) {
		res.contentType('application/json');
		res.send(JSON.stringify(posts));
	});
});

app.get('/postjs.css', function (req, res) {
	res.contentType('text/css');
	css.render(str, { filename: 'postjs.styl' }, function (err, css) {
		if (err) {
			throw err;
		}
		res.send(css);
	});
});

var socket = io.listen(app);
socket.on("connection", function (client) {
	console.log('Client connected');
	client.on('message', function(e) {
		console.log('Message', e);
		client.send(e);
		client.broadcast(e);
	});
	client.on('disconnect', function() {
		console.log('Client disconnected')
	});
});
app.listen(3000);