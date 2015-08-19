Capstone.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["user_profile"],

  events: {
    "click .all-following" : "showAllFollowedUsers"
  },

  initialize: function () {
    this.addUserInfo();
    this.addUserFeed();
    this.addFollowingList();
  },

  addUserInfo: function () {
    var userInfoView = new Capstone.Views.UserInfo({model: this.model});
    this.addSubview(".user-info", userInfoView);
  },

  addUserFeed: function () {
    var userFeed = new Capstone.Views.UserFeed({model: this.model });
    this.addSubview(".user-feed", userFeed);
  },

  addFollowingList: function () {
    var followed_by = new Capstone.Collections.Users();
    followed_by.fetch({data : {six_followed_by : this.model.id }})
    var followingList = new Capstone.Views.FollowingList({collection: followed_by, model: this.model});
    this.addSubview(".followed-by", followingList);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
