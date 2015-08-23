// this contacts view file contains 2 views, a Marionette ItemView for the individual 'card' for a contact,
// and then a Marionette CollectionView which is a collection of the 'card' views for the collection of contacts
var Marionette = require('backbone.marionette');

var itemView = Marionette.ItemView.extend({
    template: require('../../templates/contact_small.hbs'),
    // Browserify will replace the above line with a precompiled javascript function of the template during build 
    // time, making it faster versus relying on the browser to do the compilation every time a view is rendered
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events: {
        'click': 'showDetails'
    },

    showDetails: function() {
        window.App.core.vent.trigger('app:log', 'Contacts View: showDetails hit.');
        window.App.controller.details(this.model.id);
    }
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    initialize: function() {
        // this CollectionView has a listener on its collection for any change events,
        // to re-render itself if a new contact is added to the collection or removed
        this.listenTo(this.collection, 'change', this.render);
    },
    itemView: itemView
});
