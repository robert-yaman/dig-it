Capstone.Views.UserInfo = Backbone.CompositeView.extend({
  template: JST["user_info"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.addSubview(".most-popular-song .song-item", new Capstone.Views.UserListItemSongItem({model: this.model.mostPopularSong() }))
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
