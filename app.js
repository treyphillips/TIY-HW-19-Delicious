(function() {
  'use strict';

  window.App = window.App || {};

  $.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "K4zLqJj9DKABboTYQLeVyeQVBlhqOtJO7CrTQIEq",
      "X-Parse-REST-API-Key": "Y7V0uUBdUqCe9sVMx1ZWEkllLDgxaJtp5tYCoTa7"
    }
  });


  //////////Model//////////


  var Link = Backbone.Model.extend({
    idAttribute: 'objectId',

    defaults: function(attributes) {
      attributes = attributes || {};
      return _.defaults(attributes, {

        title: '',
        url: '',
        description: '',
        tags: ['']
      });
    }

  });


  //////////Collections//////////


  var Links = Backbone.Collection.extend({
    model: Link,
    url: 'https://api.parse.com/1/classes/Bookmarks',
    parse: function(response) {
      return response.results;
    }
  });

  var Tags = Backbone.Collection.extend({
    model: Link,
    url: "https://api.parse.com/1/classes/Bookmarks",
    parse: function(repsonse){
      return response.results;
    }
  });

  //////////Views//////////


  var LinksView = Backbone.View.extend({
    template: _.template($('#link-template').text()),
    tagName: 'li',
    model: new Link(),
    initialize: function() {
      $('#container').append(this.el);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      // this.$el.html(this.template());
      return this;
    }

  });



  //////////Router//////////


  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',

    },

    initialize: function() {
      this.link = new Link();
      this.links = new Links();
      this.linksview = new LinksView({collection: this.links});
    },

    index: function() {
      // console.log('router');
      var self = this;
      self.links.fetch().done(function() {
      self.linksview.render();
  });
}
});



  //////////Glue Code//////////


  $(document).ready(function() {
    window.router = new AppRouter();
    Backbone.history.start();
  });

}());
