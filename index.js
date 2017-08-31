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

const ASK_STRING = 'input.ask.string';
const ASK_STRING2 = 'input.ask.string.2';
const ASK_SIMPLE = 'input.ask.simple';
const ASK_RICH = 'input.ask.rich';

exps.post('/hook', function(request, response) {
  const app = new ApiAiApp({request, response});
  function tellString (app) {
    app.ask('Welcome to action snippets! Say a number.', ['Say any number', 'Pick a number', 'We can stop here. See you soon.']);
  }

  function tellSimple (app) {
    app.tell({speech: 'hello', displayText: 'simple'});
  }

  function tellRich (app) {

    app.tell(
      app.buildRichResponse()
            .addSimpleResponse({ speech: 'hello', displayText: 'hi' })
            .addSuggestions(['Say this', 'or this'],
                ['Say any number', 'Pick a number', 'We can stop here. See you soon.'])
    );
  }

  function askString() {
      app.ask('Welcome to action snippets! Say a number.');
  }

  function askString2() {
      app.ask('Welcome to action snippets! Say a number.', ['Say any number', 'Pick a number', 'We can stop here. See you soon.']);
  }

  function askSimple() {
      app.ask({speech: 'hello', displayText: 'simple'}, ['Say any number', 'Pick a number', 'We can stop here. See you soon.']);
  }

  function askRich() {
      app.ask(
          app.buildRichResponse()
              .addSimpleResponse({ speech: 'hello', displayText: 'hi' })
              .addSuggestions(['Say this', 'or this'],
                  ['Say any number', 'Pick a number', 'We can stop here. See you soon.'])
      );
  }

  let actionMap = new Map();
  actionMap.set(TELL_STRING, tellString);
  actionMap.set(TELL_SIMPLE, tellSimple);
  actionMap.set(TELL_RICH, tellRich);
  actionMap.set(ASK_STRING, askString);
  actionMap.set(ASK_STRING2, askString2);
  actionMap.set(ASK_SIMPLE, askSimple);
  actionMap.set(ASK_RICH, askRich);

  app.handleRequest(actionMap);
});

exps.listen((process.env.PORT || 7001), function() {
    console.log("App up and running, listening.")
})
