Capstone.Collections.UserSongs = Backbone.Collection.extend({
  url: 'api/songs',
  model: Capstone.Models.Song,

  //integrate with normal songs?

  initialize: function (options) {
    this.user = options.user;
  }
});
