Capstone.Views.UserListItemSongItem = Backbone.View.extend({
  template: JST["user_list_item_song_item"],
  tagName: "li",
  className: "user-list-item-song-item list-group-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
