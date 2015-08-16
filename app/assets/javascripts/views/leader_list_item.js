Capstone.Views.LeaderListItem = Backbone.CompositeView.extend({
  template: JST["leader_list_item"],
  tagName: "li",
  className: "leader-list-item list-group-item",

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
    var cur; var model;

    for (var i = 0; i < 3; i++) {
      cur = songs.at(i)
      if (cur) {
        if (cur.id === (Capstone.currentSong && Capstone.currentSong.id)) {
          model = Capstone.currentSong;
        } else {
          model = cur;
        }

        Capstone.onPageSongs.push(model);
        var view = new Capstone.Views.UserListItemSongItem({model: model});
        this.addSubview(".leader-songs-list", view);
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
