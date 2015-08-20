Capstone.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["search_results"],

  events: {
    "click .expand-button.song-expand-button" : "expandSongs",
    "click .expand-button.user-expand-button" : "expandUsers"
  },

  initialize: function (options) {
    this.userSearchResults = options.userSearchResults;
    this.songSearchResults = options.songSearchResults;

    //for showing more results
    this.songOffset = 0;
    this.userOffset = 0;

    // //listening for it another search is fired
    // this.listenTo(this.songSearchResults, "sync", function() {
    //   this.resetSearchResults();
    //   this.render();
    // });
    //
    // this.listenTo(this.userSearchResults, "sync", function() {
    //   this.resetSearchResults();
    //   this.render();
    // });

    this.addSongResults();
    this.addUserResults();
  },

  addSongResults: function () {
    var songResults = new Capstone.Views.SongList({collection: this.songSearchResults});
    this.addSubview(".song-results", songResults);
  },

  addUserResults: function () {
    var userResults = new Capstone.Views.UserList({collection: this.userSearchResults});
    this.addSubview(".user-results", userResults);  },
    
  expandSongs: function () {
    this.songOffset++
    var newSongs = new Capstone.Collections.Songs();
    newSongs.fetch({data: {query: this.songSearchResults.query, offset: this.songOffset}})
    var newView = new Capstone.Views.SongList({collection: newSongs})
    this.addSubview(".song-results", newView)
  },

  expandUsers: function () {
    this.userOffset++
    var newUsers = new Capstone.Collections.Users();
    newUsers.fetch({data: {query: this.userSearchResults.query, offset: this.userOffset}})
    var newView = new Capstone.Views.UserList({collection: newUsers})
    this.addSubview(".user-results", newView)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
