Capstone.Collections.UserSongs = Backbone.Collection.extend({
  url: 'api/songs',
  model: Capstone.Models.Song,

  //TODO: songs appear in reverse order so that newer ones are at top on profile pages
  // comparator: function(song1, song2) {
  //   if (song1.get("updated_at") <)
  // },

  //integrate with normal songs?

  initialize: function (options) {
    this.user = options.user;
  }
});
