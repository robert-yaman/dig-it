Capstone.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["search_results"],

  events: {
    "click .expand-button.song-expand-button" : "renderMoreSongs",
    "click .expand-button.user-expand-button" : "renderMoreUsers"
  },

  initialize: function (options) {
    this.userSearchResults = options.userSearchResults;
    this.songSearchResults = options.songSearchResults;

    //for showing more results
    this.songOffset = 0;
    this.userOffset = 0;

    this.addSongResults();
    this.addUserResults();
  },

  addSongResults: function () {
    var songResults = new Capstone.Views.SongList({
      collection: this.songSearchResults
    });
    this.addSubview(".song-results", songResults);

    this.fetchMoreSongs();
  },

  addUserResults: function () {
    var userResults = new Capstone.Views.UserList({
      collection: this.userSearchResults
    });
    this.addSubview(".user-results", userResults);

    this.fetchMoreUsers();
  },

  fetchMoreSongs: function () {
    this.songOffset++;
    this.moreSongs = new Capstone.Collections.Songs();
    this.moreSongs.fetch({data: {
      query: this.songSearchResults.query,
      offset: this.songOffset},
      success: function (response, collection) {
        if (collection.length === 0) {
          this.$(".song-expand-button").css("display", "none");
        } else if (collection.length > 1) {
          this.$(".song-expand-button").css("display", "bloack");
        }
      }
    });
  },

  fetchMoreUsers: function () {
    this.userOffset++;
    this.moreUsers = new Capstone.Collections.Users();
    this.moreUsers.fetch({data: {
      query: this.userSearchResults.query,
      offset: this.userOffset},
      success: function (response, collection) {
        if (collection.length === 0) {
          this.$(".user-expand-button").css("display", "none");
        } else if (collection.length > 1) {
          this.$(".user-expand-button").css("display", "bloack");
        }
      }
    });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  renderMoreSongs: function () {
    var newView = new Capstone.Views.SongList({collection: this.moreSongs});
    this.addSubview(".song-results", newView);

    this.fetchMoreSongs();
  },

  renderMoreUsers: function () {
    var newView = new Capstone.Views.UserList({collection: this.moreUsers});
    this.addSubview(".user-results", newView);

    this.fetchMoreUsers();
  }
});
