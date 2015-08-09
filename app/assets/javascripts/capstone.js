window.Capstone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(options) {
    if (options.router === "landing") {
      new Capstone.Routers.LandingRouter();
    } else if (options.router === "root") {
      new Capstone.Routers.AppRouter();
    }
    Backbone.history.start();
  }
};
