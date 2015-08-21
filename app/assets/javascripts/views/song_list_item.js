Capstone.Views.SongListItem = Backbone.View.extend({
  template: JST["song_list_item"],
  tagName: "li",
  className: "song-list-item list-group-item",

  events: {
    "click .playback-button" : "togglePlay",
    "click .add-to-queue" : "addToQueue",
    "click .play-next" : "playNext",
    "click .delete-song" : "deleteMe"
  },

  initialize: function () {
    //so doesn't re-render when digs array is saved
    this.model.on("sync", function(model, resp, options) {
      if (options.silent) return
      this.render;
    })
    // this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model, "play", this.activate)
    this.listenTo(this.model, "pause", this.deactivate)
  },

  activate: function () {
    this.$(".playback-button").addClass("playing")
    this.$(".playback-button .glyphicon").removeClass("glyphicon-play")
    this.$(".playback-button .glyphicon").addClass("glyphicon-pause")
  },

  addToQueue: function (event) {
    event.preventDefault();
    this.model.pushOntoQueue();
  },

  deactivate: function () {
    this.$(".playback-button").removeClass("playing")
    this.$(".playback-button .glyphicon").removeClass("glyphicon-pause")
    this.$(".playback-button .glyphicon").addClass("glyphicon-play")
  },

  deleteMe: function (event) {
    event.preventDefault()
    this.model.collection.remove(this.model);
    this.model.destroy();
  },

  togglePlay: function () {
    //can I just use the currentSong.playing attribute here?
    if (this.$(".playback-button").hasClass("playing")) {
      this.model.pause();
    } else {
      this.model.play();
    }
  },

  playNext: function (event) {
    event.preventDefault();
    this.model.unshiftOntoQueue();
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);

    if (this.model === Capstone.currentSong && Capstone.currentSong.playing) this.activate();

    return this;
  }
});
