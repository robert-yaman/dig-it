Capstone.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  length: function () {
    if (!this.get("length")) return;
    return Capstone.timify(this.get("length"));
  },

  pause: function () {
    // if (Capstone.dontPlayMoreSongs) return;
    console.log("pausing")

    Capstone.pauseSong(this);
    this.trigger("pause");

    //trigger pause on all sibling songs
    Capstone.onPageSongs.forEach(function(song) {
      if (song.id === this.id) {
        song.trigger("pause");
      }
    }.bind(this))
  },

  play: function () {
    if (Capstone.dontPlayMoreSongs) return;
    console.log("playing")

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
    Capstone.queueSong.set(this.attributes);
    //triggering custom event here in case no attributes of the model actual change
    Capstone.queueSong.trigger("queue-change");
  },

  unshiftOntoQueue: function () {
    this.set("playNext", true);
    Capstone.queueSong.set(this.attributes);
    //triggering custom event here in case no attributes of the model actual change
    Capstone.queueSong.trigger("queue-change");
  }
});
