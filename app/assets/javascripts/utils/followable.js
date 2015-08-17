Capstone.Mixins.Followable = {
  follow: function () {
    console.log("following")
    this.model.follow().save({followed_user_id: this.model.id})
  },

  toggleFollow: function () {
    debugger
    if (this.model.isBeingFollowed()) {
      this.unfollow()
    } else {
      this.follow()
    }
  },

  unfollow: function () {
    console.log("unfollowing")
    this.model.follow().destroy();
    this.model.follow().clear();
  }
}
