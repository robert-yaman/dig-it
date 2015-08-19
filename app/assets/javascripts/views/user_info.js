Capstone.Views.UserInfo = Backbone.CompositeView.extend(
  _.extend({}, Capstone.Mixins.Followable, {
    template: JST["user_info"],

    events: {
      "click button.follow-button" : "toggleFollow"
    },

    initialize: function () {
      this.listenTo(this.model, "sync", this.render);
      this.listenTo(this.model.follow(), "change", this.render)

      this.addSubview(".most-popular-song .song-item", new Capstone.Views.UserListItemSongItem({model: this.model.mostPopularSong() }))
    },

    render: function () {
      var content = this.template({ user: this.model });
      this.$el.html(content);
      this.attachSubviews();
      this.installFollowButton();
      return this;
    }
  })
);
