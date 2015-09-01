Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "feedPage",
    "profile" : "profile",
    "users/:id" : "userShow",
    "search" : "search",
    "log_out" : "logOut",
    "about" : "aboutDigIt",
    "feedback" : "feedback",
    "tutorial" : "tutorial"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.userSearchResults = options.userSearchResults;
    this.songSearchResults = options.songSearchResults;
  },

  aboutDigIt: function () {
    this._switch(new Capstone.Views.AboutDigIt());
  },

  feedback: function () {
    this._switch(new Capstone.Views.Feedback());
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
  //It will be easier now that I switched order in initialize
  profile: function() {
    var profile = new Capstone.Views.CurrentUserProfile({
      model: Capstone.currentUser
    });
    this._switch(profile);

    if (Capstone.tutorialMode === 5) Capstone.runFifthTutorial();
  },

  search: function() {
    var searchResults = new Capstone.Views.SearchResults({
      userSearchResults: this.userSearchResults,
      songSearchResults: this.songSearchResults
    });
    this._switch(searchResults);
  },

  tutorial: function () {
    Capstone.tutorialMode = 1;
    Backbone.history.navigate("/#", {trigger: true});
  },

  userShow: function(id) {
    var user = new Capstone.Models.User({id: id});
    user.fetch({data : {extra_profile_info : true}});
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
