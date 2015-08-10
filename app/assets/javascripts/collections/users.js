Capstone.Collections.Users = Backbone.Collection.extend({
  url: 'api/users',
  model: Backbone.Model.User,

  songs: function () {
    if (!this._songs) {
      this._songs = new Capstone.Collections.UserSongs();
    }

    return this._songs;
  },

  parse: function(payload) {
    if (payload.songs) {
      this.songs = this.songs.set(payload.songs, {user: this});

      delete payload.songs;
    }

    return payload;
  }
});
