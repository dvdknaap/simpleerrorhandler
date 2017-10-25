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

#### Config
Be sure you have an config.json file in your root directory with the content as discribed in `config.json.example`
```javascript
{
  "SIMPLEMAILER": {
    "SERVER": {
      "HOST":"mail.domain.com",
      "PORT":"587",
      "USERNAME":"username",
      "PASSWORD":"password",
      "SECURE": "false",
      "DKIM": {
        "DOMAINNAME": "mail.domain.com",
        "KEYSELECTOR": "2017",
        "PRIVATEKEY": "./DKIM/private.key",
        "CACHEDIR": "/tmp",
        "CACHETRESHOLD": 86400
      },
      "TLS": {
          "REJECTUNAUTHORIZED": false
      }
    },
    "FROMNAME": "from name",
    "FROMEMAIL": "email@domain.com",
    "REPLYTO": "reply@domain.com"
  },
  "SIMPLEERRORHANDLING": {
    "MAIL": {
      "FROM": "Simple errorHandler",
      "EMAIL": "mail@test.nl"
    },
    "MOBILE": [
    ]
  }
}

```