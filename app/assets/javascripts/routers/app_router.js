Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "feedPage",
    "profile" : "profile",
    "users/:id" : "userShow"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;

    this.setupNewSongButton();
  },

  feedPage : function () {
    var feed = new Capstone.Views.FeedPage();
    this._switch(feed);
  },

  //TODO combine with userShow so that there is not one current user show page that current user can't edit
  //low priority
  //COULD make a conditional in Show to see if id is currentuser.id, but then have to wait for current user to fetch
  //be easier now that I switched order in initialize
  profile: function() {
    var profile = new Capstone.Views.CurrentUserProfile({model: Capstone.currentUser});
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
  }
});
