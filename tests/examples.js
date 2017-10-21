'use strict';
const simpleErrorHandler = require('../simpleerrorhandler.js');

/* Run These tests by commandline from the root directory:
	NODE_TLS_REJECT_UNAUTHORIZED=0 node tests/examples.js
*/

//Set error handling
simpleErrorHandler.init();


// exit after timeout
setTimeout(function () {
	throw new Error("Error handler test");
}, 2000);