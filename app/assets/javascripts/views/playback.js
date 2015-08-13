Capstone.Views.Playback = Backbone.View.extend({
  template: JST["playback"],

  pauseSong: function(song) {
    this.$("audio")[0].pause();
  },

  playSong: function(song) {
    if (!this.$("nav").hasClass("active")) {
      this.$("nav").addClass("active")
      this.model = song;
      this.render();
    }

    if (Capstone.currentSong && Capstone.currentSong.id === song.id) {
      this.$("audio")[0].play();
    } else {
      this.$(".audio-tag").html(
        '<audio autoplay src="' + song.escape("file_path") + '"></audio>'
      )

      Capstone.currentSong && Capstone.currentSong.trigger("pause")
      Capstone.currentSong = song
    }
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
