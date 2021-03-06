Capstone.Views.UserListItemSongItem = Backbone.View.extend({
  template: JST["user_list_item_song_item"],
  tagName: "li",
  className: "user-list-item-song-item list-group-item",

  events: {
    "click .mini-playback-button" : "togglePlay",
    "click .add-to-queue" : "addToQueue",
    "click .play-next" : "playNext"
  },

  initialize: function () {
    //change listener is for most popular song on user show page
    this.listenTo(this.model, "change", this.render);

    this.model.on("sync", function(model, resp, options) {
      if (options.silent) return;
      this.render;
    });
    // this.listenTo(this.model, "sync", this.render)
    this.listenTo(this.model, "play", this.activate);
    this.listenTo(this.model, "pause", this.deactivate);
  },

  activate: function () {
    this.$(".mini-playback-button").addClass("playing");
    this.$(".mini-playback-button").removeClass("glyphicon-play");
    this.$(".mini-playback-button").addClass("glyphicon-pause");
  },

  addToQueue: function (event) {
    event.preventDefault();
    this.model.pushOntoQueue();
  },

  deactivate: function () {
    this.$(".mini-playback-button").removeClass("playing");
    this.$(".mini-playback-button").removeClass("glyphicon-pause");
    this.$(".mini-playback-button").addClass("glyphicon-play");
  },

  togglePlay: function () {
    if (this.$(".mini-playback-button").hasClass("playing")) {
      this.model.pause();
    } else {
      this.model.play();
    }
  },

  playNext: function (event) {
      event.preventDefault();
      this.model.unshiftOntoQueue();
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
