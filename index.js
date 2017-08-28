'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var exps = express();

const ApiAiApp = require('actions-on-google').ApiAiApp;

exps.use(bodyParser.json());

// API.AI actions
const WELCOME_ACTION = 'input.welcome';

exps.post('/hook', function(request, response) {
  const app = new ApiAiApp({request, response});
  function greetUser (app) {
    app.tell("Hello World!");
  }

  let actionMap = new Map();
  actionMap.set(WELCOME_ACTION, greetUser);

  app.handleRequest(actionMap);
});

exps.listen((process.env.PORT || 7001), function() {
    console.log("App up and running, listening.")
})
