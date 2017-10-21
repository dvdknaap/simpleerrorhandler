'use strict';
const fs   = require('fs');
let config = false;

// Check if config is in project root
if (fs.existsSync('../../config.json')) {
	config = require('../../config.json');
}
// Use config file in nodemailer node_modules
else if (fs.existsSync('config.json')) {
	config = require('./config.json');
}
// Use config file in nodemailer node_modules
else if (fs.existsSync(__dirname+'/../../config.json')) {
	config = require(__dirname+'/../../config.json');
}
// No config.json found
else {
	throw new Error("No config.json found, read README.md for help");
}

const simpleMailer = require('simplemailer');
const tableify     = require('tableify');

var simpleErrorHandler = {
	"init": function () {

		//Error handling
		process.stdin.resume();//so the program will not close instantly

		//do something when app is closing
		process.on('exit', function (error) {

		    let mailResponse = simpleMailer.send({
		        to: config.SIMPLEERRORHANDLING.MAIL.FROM+' <'+config.SIMPLEERRORHANDLING.MAIL.EMAIL+'>',
		        subject: 'exit on received',
		        html: tableify({
		        	'date': (new Date).toUTCString(),
		            'error': error.toString(),
		            'strack': error.stack,
		            'config': config,
		        })
		    }, undefined, undefined, function (data) {

		    	console.info(error, 'uncaughtException error');
		    	console.info(data, 'mailResponse data');
		    	process.exit(1);
		    });
		});

		//catches ctrl+c event
		process.on('SIGINT', function (error) {

		    let mailResponse = simpleMailer.send({
		        to: config.SIMPLEERRORHANDLING.MAIL.FROM+' <'+config.SIMPLEERRORHANDLING.MAIL.EMAIL+'>',
		        subject: 'SIGINT on received',
		        html: tableify({
		        	'date': (new Date).toUTCString(),
		            'error': error.toString(),
		            'strack': error.stack,
		            'config': config,
		        })
		    }, undefined, undefined, function (data) {

		    	console.info(error, 'uncaughtException error');
		    	console.info(data, 'mailResponse data');
		    	process.exit(1);
		    });
		});

		//catches uncaught exceptions
		process.on('uncaughtException', function (error) {

		    let mailResponse = simpleMailer.send({
		        to: config.SIMPLEERRORHANDLING.MAIL.FROM+' <'+config.SIMPLEERRORHANDLING.MAIL.EMAIL+'>',
		        subject: 'exceptionHandler on received',
		        html: tableify({
		        	'date': (new Date).toUTCString(),
		            'error': error.toString(),
		            'strack': error.stack,
		            'config': config,
		        })
		    }, undefined, undefined, function (data) {

		    	console.info(error, 'uncaughtException error');
		    	console.info(data, 'mailResponse data');
		    	process.exit(1);
		    });
		});
	}
};

module.exports = simpleErrorHandler;