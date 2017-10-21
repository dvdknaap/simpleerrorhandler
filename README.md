# Simple Error handler
[![NPM Version](http://img.shields.io/npm/v/simpleerrorhandler.svg?style=flat)](https://www.npmjs.org/package/simpleerrorhandler)

Easy to use error handler - mail uncaughtException, SIGINT and process exits

#### Install
```npm install simpleerrorhandler```


#### Test
```node tests/examples.js```



#### Easy To use
1. Create or modify your config.json in your root folder from the 'config.json.example'
2. Require simpleerrorhandler in your pogram and execute the init
```javascript
const simpleErrorHandler = require('simpleerrorhandler');

//Set error handling
simpleErrorHandler.init();

```
