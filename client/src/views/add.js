// this view renders a form that is used to insert a new contact
var Marionette = require('backbone.marionette');

module.exports = AddView = Marionette.ItemView.extend({
    template: require('../../templates/add.hbs'),
    events: {
        'click a.save-button': 'save'
    },

    save: function(e) {
        e.preventDefault();
        // we make a new contact object that matches what our data objects look like on the MongoDB side
        var newContact = {
            name: {
                first: this.$el.find('#name_first').val(),
                last: this.$el.find('#name_last').val()
            },
            email: this.$el.find('#email').val(),
            phone: this.$el.find('#phone').val()
        };

        // we then simply pass the object ito Backbone's collection.create() function which will,
        // using the default Backbone implementation, make a POST call to the API url for the collection
        // and pass a JSON object for the variable that was defined.
        window.App.data.contacts.create(newContact);
        window.App.core.vent.trigger('app:log', 'Add View: Saved new contact!');
        window.App.controller.home();
    }
});
