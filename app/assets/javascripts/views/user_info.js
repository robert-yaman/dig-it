Capstone.Views.UserInfo = Backbone.CompositeView.extend({
  template: JST["user_info"],
  className: "user-info",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.addSubview(".most-popular-song span", new Capstone.Views.UserListItemSongItem({model: this.model.mostPopularSong() }))
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
