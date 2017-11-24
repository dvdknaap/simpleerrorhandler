'use strict';

const simpleMailer = require('simplemailer');
const tableify     = require('tableify');

var simpleErrorHandler = {
	"init": function (configLocation) {

		const fs   = require('fs');
		let config = false;

		// Check if we received an app dir
		if (typeof configLocation === "undefined") {
			let path   = require('path');
			configLocation = path.dirname(require.main.filename+'/config.json');
		}

		// Check if config is in project root
		if (fs.existsSync(configLocation)) {
			simpleMailer.init(configLocation);
			config = require(configLocation);
		}
		// No config.json found
		else {
			throw new Error("No config.json found, read README.md for help");
		}

		//Error handling
		process.stdin.resume();//so the program will not close instantly

		//do something when app is closing
		process.on('exit', function (code) {

		    let mailResponse = simpleMailer.send({
		        to: config.SIMPLEERRORHANDLING.MAIL.FROM+' <'+config.SIMPLEERRORHANDLING.MAIL.EMAIL+'>',
		        subject: 'exit on received',
		        html: tableify({
		        	'date': (new Date).toUTCString(),
		            'error': code,
		            'config': config,
		        })
		    }, undefined, undefined, function (data) {

		    	console.info(error, 'exit error');
		    	// console.info(data, 'mailResponse data');
		    	process.exit(1);
		    });
		});

		//catches ctrl+c event
		process.on('SIGINT', function () {

		    let mailResponse = simpleMailer.send({
		        to: config.SIMPLEERRORHANDLING.MAIL.FROM+' <'+config.SIMPLEERRORHANDLING.MAIL.EMAIL+'>',
		        subject: 'SIGINT on received',
		        html: tableify({
		        	'date': (new Date).toUTCString(),
		            'config': config,
		        })
		    }, undefined, undefined, function (data) {

		    	// console.info(data, 'mailResponse data');
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
		            'error': error,
		            'config': config,
		        })
		    }, undefined, undefined, function (data) {

		    	console.info(error, 'uncaughtException error');
		    	// console.info(data, 'mailResponse data');
		    	process.exit(1);
		    });
		});
	}
};

module.exports = simpleErrorHandler;