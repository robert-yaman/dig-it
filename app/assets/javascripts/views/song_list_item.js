Capstone.Views.SongListItem = Backbone.View.extend({
  template: JST["song_list_item"],
  tagName: "li",
  className: "song-list-item list-group-item",

  events: {
    "click .playback-button" : "togglePlay",
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "play", this.activate)
    this.listenTo(this.model, "pause", this.deactivate)
  },

  activate: function () {
    this.$(".playback-button").addClass("playing")
    this.$(".playback-button .glyphicon").removeClass("glyphicon-play")
    this.$(".playback-button .glyphicon").addClass("glyphicon-pause")
  },

  deactivate: function () {
    this.$(".playback-button").removeClass("playing")
    this.$(".playback-button .glyphicon").removeClass("glyphicon-pause")
    this.$(".playback-button .glyphicon").addClass("glyphicon-play")
  },

  togglePlay: function () {
    if (this.$(".playback-button").hasClass("playing")) {
      this.model.pause();
    } else {
      this.model.play();
    }
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);

    if (this.model === Capstone.currentSong) this.activate();

    return this;
  }
});
