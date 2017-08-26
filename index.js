'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var exps = express();

exps.use(bodyParser.json());

exps.post('/hook', function(request, response) {
  response.json({
    "speech": "Hello from hook",
    "displayText": "Hello from hook",
    "data": {},
    "contextOut": [
      {"name":"get-address", "lifespan":1, "parameters":{"address_invocation":"address"}}
    ],
    "source": "Mr Sukha"
  });
});

exps.listen((process.env.PORT || 7001), function() {
    console.log("App up and running, listening.")
})
