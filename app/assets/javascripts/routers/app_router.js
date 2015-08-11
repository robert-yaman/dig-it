Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "feed"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  feed : function () {
    //this is temp
    var user = new Capstone.Models.User({id: 1});

    user.fetch();
    var view = new Capstone.Views.SongList({ collection: user.songs() });
    this._switch(view);
  },

  _switch : function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
