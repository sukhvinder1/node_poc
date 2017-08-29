'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var exps = express();

const ApiAiApp = require('actions-on-google').ApiAiApp;

exps.use(bodyParser.json());

// API.AI actions
const TELL_STRING = 'input.tell.string';
const TELL_SIMPLE = 'input.tell.simple';
const TELL_RICH = 'input.tell.rich';

exps.post('/hook', function(request, response) {
  const app = new ApiAiApp({request, response});
  function tellString (app) {
    app.ask('Welcome to action snippets! Say a number.',
        ['Say any number', 'Pick a number', 'We can stop here. See you soon.'])
    //app.tell("Hello Tell");
  }

  function tellSimple (app) {
    app.ask({speech: 'hello', displayText: 'simple'}, ['Say any number', 'Pick a number', 'We can stop here. See you soon.'])
    //app.tell({speech: 'hello', displayText: 'simple'});
  }

  function tellRich (app) {

    app.ask(
      app.buildRichResponse()
            .addSimpleResponse({ speech: 'hello', displayText: 'hi' })
            .addSuggestions(['Say this', 'or this'])
    );
  }

  let actionMap = new Map();
  actionMap.set(TELL_STRING, tellString);
  actionMap.set(TELL_SIMPLE, tellSimple);
  actionMap.set(TELL_RICH, tellRich);

  app.handleRequest(actionMap);
});

exps.listen((process.env.PORT || 7001), function() {
    console.log("App up and running, listening.")
})
