Capstone.Views.Playback = Backbone.View.extend({
  template: JST["playback"],

  playSong: function(song) {
    alert("playing " + song.escape("name"))
    this.$(".audio-tag").html(
      '<audio autoplay src="' + song.escape("file_path") + '"></audio>'
    )
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
