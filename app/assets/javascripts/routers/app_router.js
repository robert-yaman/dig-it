Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "feedPage",
    "profile" : "profile",
    "users/:id" : "userShow",
    "search" : "search",
    "log_out" : "logOut"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.userSearchResults = options.userSearchResults;
    this.songSearchResults = options.songSearchResults;

    // this.setupNewSongButton();
  },

  feedPage : function () {
    var feed = new Capstone.Views.FeedPage();
    this._switch(feed);
  },

  logOut: function () {
    $.ajax({
      url: "session",
      type: "DELETE",
      success: function () {
        window.location.href = "/landing";
      }
    });
  },

  //TODO combine with userShow so that there is not one current user show page that current user can't edit
  //low priority
  //COULD make a conditional in Show to see if id is currentuser.id, but then have to wait for current user to fetch
  //be easier now that I switched order in initialize
  profile: function() {
    var profile = new Capstone.Views.CurrentUserProfile({model: Capstone.currentUser});
    this._switch(profile);
  },

  search: function() {
    var searchResults = new Capstone.Views.SearchResults({
      userSearchResults: this.userSearchResults,
      songSearchResults: this.songSearchResults
    });
    this._switch(searchResults);
  },

  userShow: function(id) {
    var user = new Capstone.Models.User({id: id});
    user.fetch();
    var show = new Capstone.Views.UserProfile({model: user});
    this._switch(show);
  },

  _switch : function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();

    Capstone.onPageSongs.length = 0;
  }
});
