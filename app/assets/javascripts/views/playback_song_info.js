Capstone.Views.PlaybackSongInfo = Backbone.View.extend({
  template: JST["playback_song_info"],
  className: "playback_song_info",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({song: this.model});
    this.$el.html(content);
    return this;
  }
});
