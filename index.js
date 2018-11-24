'use strict';
var Alexa = require('alexa-sdk');
var request = require('request');


var APP_ID = undefined;


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    //'LaunchRequest': function () {
    //    this.emit('TellJokeIntent');
    //    this.emit('TellUselessFactIntent');
    //},

    'TellJokeIntent': function () {
        var scope = this;
        request('https://www.reddit.com/r/dadjokes.json?limit=1', function(error, response, body){
            var resp = JSON.parse(body);
            var jokeTitle = resp.data.children[0].data.title;
            var jokeText = resp.data.children[0].data.selftext;
            var speechOutput = jokeTitle + " <break time='1s'/> " +jokeText;
            scope.emit(':tell', speechOutput)
        })
    },

    'TellUselessFactIntent': function () {
        var scope = this;
        request('https://www.reddit.com/r/UselessFacts.json?limit=1', function(error, response, body){
            var resp = JSON.parse(body);
            var jokeTitle = resp.data.children[0].data.title;
            var jokeText = resp.data.children[0].data.selftext;
            var speechOutput = jokeTitle;
            scope.emit(':tell', speechOutput)
        })
    },

    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};
