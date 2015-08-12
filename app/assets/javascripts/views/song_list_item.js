Capstone.Views.SongListItem = Backbone.View.extend({
  template: JST["song_list_item"],
  tagName: "li",
  className: "song-list-item list-group-item",

  events: {
    "click .playback-button" : "playSong"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  playSong: function(event) {
    Capstone.playSong(this.model)
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
