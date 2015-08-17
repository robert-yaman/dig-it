Capstone.Views.UserInfo = Backbone.CompositeView.extend({
  template: JST["user_info"],

  events: {
    "click button.follow-button" : "toggleFollow"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.follow(), "change", this.render)

    this.addSubview(".most-popular-song .song-item", new Capstone.Views.UserListItemSongItem({model: this.model.mostPopularSong() }))
  },

  follow: function () {
    debugger
    console.log("following")
    this.model.follow().save({followed_user_id: this.model.id})
  },

  toggleFollow: function () {
    if (this.model.isBeingFollowed()) {
      this.unfollow()
    } else {
      this.follow()
    }
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  unfollow: function () {
    console.log("unfollowing")
    this.model.follow().destroy();
    this.model.follow().clear();
  }
});
