Capstone.Collections.UserSongs = Backbone.Collection.extend({
  url: 'api/songs',
  model: Backbone.Model.Song,

  initialize: function (options) {
    this.user = options.user;
  }
});
