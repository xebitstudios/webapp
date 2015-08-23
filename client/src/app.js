var Marionette = require('backbone.marionette'),
    Controller = require('./controller'),
    Router = require('./router'),
    ContactModel = require('./models/contact'),
    ContactsCollection = require('./collections/contacts');

module.exports = App = function App() {};

App.prototype.start = function(){
    App.core = new Marionette.Application(); // create a new Marionette Application

    // bind an event to initialize:before. 
    // we define what we want to happen before our App starts here
    App.core.on("initialize:before", function (options) {
        App.core.vent.trigger('app:log', 'App: Initializing');

        // create a few cache objects for the views and data on the App itself
        App.views = {};
        App.data = {};

        // load/fetch up some initial data:
        var contacts = new ContactsCollection();
        contacts.fetch({
            success: function() {
                App.data.contacts = contacts;
                App.core.vent.trigger('app:start'); // once the fetch is complete, we then trigger the app:start
            }
        });
    });

    // bind an event to app:start
    // inside app:start, we basically create a new instance of the app's controller
    // and a new instance of our router. the router takes the controller as part of its constructor.
    // both the controller and router we just created are Marionette objects.
    App.core.vent.bind('app:start', function(options){
        App.core.vent.trigger('app:log', 'App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            App.core.vent.trigger('app:log', 'App: Backbone.history starting');
            Backbone.history.start();
        }

        //new up and views and render for base app here...
        App.core.vent.trigger('app:log', 'App: Done starting and running!');
    });

    // bind an event to app:log
    App.core.vent.bind('app:log', function(msg) {
        console.log(msg);
    });

    // start the Marionette app
    App.core.start(); // this will now trigger to 2 events we binded to earlier
};
