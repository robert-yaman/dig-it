Capstone.Collections.UserSongs = Backbone.Collection.extend({
  url: 'api/songs',
  model: Capstone.Models.Song,

  initialize: function (options) {
    this.user = options.user;
  }
});
