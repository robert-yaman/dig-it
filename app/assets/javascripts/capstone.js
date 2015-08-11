window.Capstone = {
  Models: {},
  Collections: {},
  Views: {Modals: {}},
  Routers: {},
  initialize: function(options) {
    window.Capstone.currentUser = new Capstone.Models.CurrentUser();
    window.Capstone.currentUser.fetch();

    var $rootEl = $('#content');
    new Capstone.Routers.AppRouter({$rootEl: $rootEl});

    Backbone.history.start();
  }
};
