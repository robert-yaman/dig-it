window.Capstone = {
  Models: {},
  Collections: {},
  Views: {Modals: {}},
  Routers: {},
  initialize: function(options) {
    var $rootEl = $('#content');
    new Capstone.Routers.AppRouter({$rootEl: $rootEl});

    Capstone.currentUser = new Capstone.Models.CurrentUser;
    Capstone.currentUser.fetch();

    Backbone.history.start();
  }
};
