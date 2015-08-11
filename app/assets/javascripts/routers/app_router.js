Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "feed"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;

    this.setupNewSongButton();
  },

  feed : function () {
    //this is temp
    var user = new Capstone.Models.User({id: 1});
    user.fetch();
    var view = new Capstone.Views.SongList({ collection: user.songs() });
    this._switch(view);
  },

  setupNewSongButton: function () {
    var song = new Capstone.Models.Song();
    var view = new Capstone.Views.SongForm({model: song});
    $("body").append(view.$el);
    view.$el.css("display", "none") //setting up modal
    view.render();
    $("#new-song-button").leanModal();
  },

  _switch : function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
