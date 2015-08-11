window.Capstone = {
  Models: {},
  Collections: {},
  Views: {Modals: {}},
  Routers: {},
  initialize: function(options) {
    var $rootEl = $('#content');
    new Capstone.Routers.AppRouter({$rootEl: $rootEl});
    Backbone.history.start();
  }
};
