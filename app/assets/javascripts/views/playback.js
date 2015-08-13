Capstone.Views.Playback = Backbone.View.extend({
  template: JST["playback"],

  pauseSong: function(song) {
    this.$("audio")[0].pause();
  },

  playSong: function(song) {
    if (this._currentSong && this._currentSong.id === song.id) {
      this.$("audio")[0].play();
    } else {
      this.$(".audio-tag").html(
        '<audio autoplay src="' + song.escape("file_path") + '"></audio>'
      )

      this._currentSong = song
    }
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
