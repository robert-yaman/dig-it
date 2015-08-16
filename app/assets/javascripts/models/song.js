Capstone.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  length: function () {
    if (!this.get("length")) return;
    return Capstone.timify(this.get("length"));
  },

  pause: function () {
    Capstone.pauseSong(this);
    this.trigger("pause");

    //trigger pause on all sibling songs
    Capstone.onPageSongs.forEach(function(song) {
      if (song.id === this.id && song !== this) {
        song.trigger("pause");
      }
    }.bind(this))
  },

  play: function () {
    Capstone.playSong(this);
    this.trigger("play");

    //trigger play on all sibling songs
    Capstone.onPageSongs.forEach(function(song) {
      if (song.id === this.id && song !== this) {
        song.trigger("play");
      }
    }.bind(this));
  },

  pushOntoQueue: function () {
    Capstone.queue.push(this);
  },

  unshiftOntoQueue: function () {
    Capstone.queue.unshift(this)
  }
});
