// this router.js file just createa a Marionette AppRouter object and then assigns
// a collection of appRoutes that will match 1:1 with functions of the same name in
// our Controller object
var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''  : 'home', // this route points to the 'home' function in the Controller
        'details/:id' : 'details', // this is the URL for a contact's details view, it points to the details function in the Controller
        'add' : 'add'
    }
});
