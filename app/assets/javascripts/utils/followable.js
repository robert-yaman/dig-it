Capstone.Mixins.Followable = {
  follow: function () {
    this.model.follow().save({followed_user_id: this.model.id});
  },

  installFollowButton: function () {
    this.$("button.follow-button.following").hover(function(){
      this.$(".follow-button").text("UnFollow");
      this.$(".follow-button").css("background-color", "#FF8C00");
    }.bind(this), function () {
      this.$(".follow-button").text("Following");
      this.$(".follow-button").css("background-color", "#4CBB17");
    }.bind(this));
  },

  toggleFollow: function () {
    if (this.model.isBeingFollowed()) {
      this.unfollow();
    } else {
      this.follow();
    }
  },

  unfollow: function () {
    this.model.follow().destroy();
    this.model.follow().clear();
  }
};
