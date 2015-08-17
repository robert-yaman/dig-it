Capstone.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  mostPopularSong: function () {
      if (!this._mostPopularSong) {
        this._mostPopularSong = new Capstone.Models.Song();
      }

      return this._mostPopularSong
  },

  parse: function(payload) {
    debugger

    if (payload.songs) {
      this.songs().set(payload.songs);

      delete payload.songs;
    }

    if (payload.most_popular_song) {
      this.mostPopularSong().set(payload.most_popular_song)

      delete payload.most_popular_song
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
