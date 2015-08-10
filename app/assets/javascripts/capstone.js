window.Capstone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    new Capstone.Routers.AppRouter();
    Backbone.history.start();
  }
};
