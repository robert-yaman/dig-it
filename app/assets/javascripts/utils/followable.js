Capstone.Mixins.Followable = {
  follow: function () {
    this.model.follow().save({followed_user_id: this.model.id})
  },

  toggleFollow: function () {
    if (this.model.isBeingFollowed()) {
      this.unfollow()
    } else {
      this.follow()
    }
  },

  unfollow: function () {
    this.model.follow().destroy();
    this.model.follow().clear();
  }
}
