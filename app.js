$.ajaxSetup({
  headers: {
    "X-Parse-Application-Id" : "K4zLqJj9DKABboTYQLeVyeQVBlhqOtJO7CrTQIEq",
    "X-Parse-REST-API-Key" : "Y7V0uUBdUqCe9sVMx1ZWEkllLDgxaJtp5tYCoTa7"
  }
});

var Link = Backbone.Model.extend ({
  idAttribute: 'objectId',

  defaults: function(attributes) {
    attributes = attributes || {};
    return _.defaults(attributes, {

    title: 'default',
    url: 'default',
    description: 'default',
    tags: ['default']
  });
  }

});

var Links = Backbone.Collection.extend ({
  model: Link,
  url: 'https://api.parse.com/1/classes/Bookmarks',
  parse: function(response) { return response.results; }
});

var LinksView = Backbone.View.extend({
  template: _.template($('#link-template').text()),
  tagName: 'li',
  
  initialize: function() {

  },

  render: function() {
    this.$el.html(this.template());
    return this;
  }

});
