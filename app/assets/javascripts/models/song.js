Capstone.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  length: function () {
    if (!this.get("length")) return
    var minutes = Math.floor(this.get("length") / 60);
    var seconds = this.get("length") - (minutes * 60);
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
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
    }.bind(this))
  }
});
