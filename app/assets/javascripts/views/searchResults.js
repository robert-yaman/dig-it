Capstone.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["search_results"],

  initialize: function (options) {
    this.userSearchResults = options.userSearchResults;
    this.songSearchResults = options.songSearchResults;

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

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
