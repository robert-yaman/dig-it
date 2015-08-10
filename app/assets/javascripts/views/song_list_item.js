Capstone.Views.SongListItem = Backbone.View.extend({
  template: JST["song_list_item"],
  tagName: "li",
  className: "song-list-item list-group-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
