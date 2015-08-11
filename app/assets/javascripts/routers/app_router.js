Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "feed",
    "profile" : "profile"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;

    this.setupNewSongButton();
  },

  feed : function () {
    //this is temp -- might add extra stuff to feed page besides feed
    var feed = new Capstone.Views.Feed();
    this._switch(feed);
  },

  profile: function() {
    var profile = new Capstone.Views.CurrentUserProfile({model: Capstone.currentUser});//temp
    this._switch(profile);
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
