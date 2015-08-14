Capstone.Views.UserListItemSongItem = Backbone.View.extend({
  template: JST["user_list_item_song_item"],
  tagName: "li",
  className: "user-list-item-song-item list-group-item",

  events: {
    "click .mini-playback-button" : "togglePlay",
  },

  initialize: function () {
    this.model.on("sync", function(model, resp, options) {
      if (options.silent) return
      this.render;
    })
    // this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model, "play", this.activate)
    this.listenTo(this.model, "pause", this.deactivate)
  },

  activate: function () {
    this.$(".mini-playback-button").addClass("playing")
    this.$(".mini-playback-button").removeClass("glyphicon-play")
    this.$(".mini-playback-button").addClass("glyphicon-pause")
  },

  deactivate: function () {
    this.$(".mini-playback-button").removeClass("playing")
    this.$(".mini-playback-button").removeClass("glyphicon-pause")
    this.$(".mini-playback-button").addClass("glyphicon-play")
  },

  togglePlay: function () {
    if (this.$(".mini-playback-button").hasClass("playing")) {
      this.model.pause();
    } else {
      this.model.play();
    }
  },
  playSong: function(event) {
    this.model.play();
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);

    if (this.model === Capstone.currentSong && Capstone.currentSong.playing) this.activate();

    return this;
  }
});
