'use strict';
process.env.DEBUG = 'actions-on-google:*';

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
const ASK_SIMPLE2 = 'input.ask.simple2';
const ASK_RICH = 'input.ask.rich';
const LOCATION = 'request_location_permission';

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
      app.ask({speech: 'hello', displayText: 'simple'});
  }

    function askSimple2() {
        app.ask({speech: '<speak>hello</speak>', displayText: 'simple'});
    }

  function askRich() {
      app.ask(
          app.buildRichResponse()
              .addSimpleResponse({ speech: 'hello', displayText: 'hi' })
              .addSuggestions(['Say this', 'or this'],
                  ['Say any number', 'Pick a number', 'We can stop here. See you soon.'])
      );
  }

  function locat() {
      let namePermission = app.SupportedPermissions.NAME;
      let preciseLocationPermission = app.SupportedPermissions.DEVICE_PRECISE_LOCATION

      // Ask for one permission
      //app.askForPermission('To address you by name', namePermission);
      // Ask for more than one permission. User can authorize all or none.
      app.askForPermissions('To address you by name and know your location',
          [namePermission, preciseLocationPermission]);

  }

  let actionMap = new Map();
  actionMap.set(TELL_STRING, tellString);
  actionMap.set(TELL_SIMPLE, tellSimple);
  actionMap.set(TELL_RICH, tellRich);
  actionMap.set(ASK_STRING, askString);
  actionMap.set(ASK_STRING2, askString2);
  actionMap.set(ASK_SIMPLE, askSimple);
  actionMap.set(ASK_SIMPLE2, askSimple2);
  actionMap.set(ASK_RICH, askRich);
  actionMap.set(LOCATION, locat);

  app.handleRequest(actionMap);
});

exps.listen((process.env.PORT || 7001), function() {
    console.log("App up and running, listening.")
})
