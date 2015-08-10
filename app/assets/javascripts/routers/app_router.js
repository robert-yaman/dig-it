Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "feed"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
  },

  feed : function () {
    //this is temp
    var song = new Capstone.Models.Song({id: 1});
    song.fetch();
    var view = new Capstone.Views.SongListItem({ model: song });
    this._switch(view);
  },

  _switch : function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
