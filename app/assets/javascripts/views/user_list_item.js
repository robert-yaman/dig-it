Capstone.Views.UserListItem = Backbone.CompositeView.extend({
  template: JST["user_list_item"],
  tagName: "li",
  className: "user-list-item list-group-item",

  initialize: function () {
    this.listenTo(this.model, "sync", function(){
      this.addThreeSongs();
      this.render();
    }.bind(this));

    this.addThreeSongs();
  },

  addThreeSongs: function () {
    //TODO: maybe three most popular songs?
    var songs = this.model.songs();

    for (var i = 0; i < 3; i++) {
      if (songs.at(i)) {
        var view = new Capstone.Views.UserListItemSongItem({model: songs.at(i)});
        this.addSubview(".user-songs-list", view);
      }
    }
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
