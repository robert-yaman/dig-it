Capstone.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  follow: function () {
    if (!this._follow) {
      this._follow = new Capstone.Models.Follow();
    }

    return this._follow
  },

  isBeingFollowed: function () {
    return !this.follow().isNew()
  },

  mostPopularSong: function () {
      if (!this._mostPopularSong) {
        this._mostPopularSong = new Capstone.Models.Song();
      }

      return this._mostPopularSong
  },

  parse: function(payload) {
    if (payload.songs) {
      this.songs().set(payload.songs);

      delete payload.songs;
    }

    if (payload.most_popular_song) {
      this.mostPopularSong().set(payload.most_popular_song);

      delete payload.most_popular_song;
    }

    if (payload.follow_by_current_user) {
      this.follow().set(payload.follow_by_current_user);

      delete payload.followed_by_current_user;
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
