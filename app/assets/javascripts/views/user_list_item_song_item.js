Capstone.Views.UserListItemSongItem = Backbone.View.extend({
  template: JST["user_list_item_song_item"],
  tagName: "li",
  className: "user-list-item-song-item list-group-item",

  events: {
    "click button" : "playSong"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  playSong: function(event) {
    this.model.play();
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
