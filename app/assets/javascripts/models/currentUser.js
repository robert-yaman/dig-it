Capstone.Models.CurrentUser = Backbone.Model.extend({
  urlRoot: "api/users/current",

  parse: function(payload) {
    if (payload.songs) {
      this.songs().set(payload.songs);

      delete payload.songs;
    }

    return payload;
  },

  songs: function () {
    if (!this._songs) {
      this._songs = new Capstone.Collections.UserSongs([], {user: this});
    }

    return this._songs;
  }
});
