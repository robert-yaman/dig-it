Capstone.Views.Playback = Backbone.View.extend({
  template: JST["playback"],

  playSong: function(song) {
    alert("playing " + song.escape("name"))
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
