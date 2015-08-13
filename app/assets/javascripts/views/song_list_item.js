Capstone.Views.SongListItem = Backbone.View.extend({
  template: JST["song_list_item"],
  tagName: "li",
  className: "song-list-item list-group-item",

  events: {
    "click .playback-button" : "playSong",
    "click .playback-button.playing" : "pauseSong"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  pauseSong: function () {
    this.model.pause();
    this.$(".playback-button").removeClass("playing")
  },

  playSong: function(event) {
    this.model.play();
    this.$(".playback-button").addClass("playing")
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
