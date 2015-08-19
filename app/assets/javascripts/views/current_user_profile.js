Capstone.Views.CurrentUserProfile = Backbone.CompositeView.extend({
  template: JST["current_user_profile"],
  //
  // events: {
  //   "click .all-following" : "showAllFollowedUsers"
  // },

  initialize: function () {
    this.addUserInfo();
    this.addUserFeed();
    this.addFollowingList();

    //So re renders after followed users can be fetched
    this.listenTo(this.model, "sync", this.addFollowingList.bind(this));
  },

  addUserInfo: function () {
    var userInfoView = new Capstone.Views.CurrentUserInfo({model: this.model});
    this.addSubview(".current-user-info", userInfoView);
  },

  addUserFeed: function () {
    var userFeed = new Capstone.Views.UserFeed({model: this.model });
    this.addSubview(".current-user-feed", userFeed);
  },

  addFollowingList: function () {
    //If model.id is 0, the model hasn't been fetched (see BB initialize), if won't have any followed users to fetch
    if (this.model.id === 0) return

    //in case this.model re-renders for some other reason
    if (this.subviews(".followed-by").first()) {
      this.removeSubview(".followed-by", this.subviews(".followed-by").first());
    }

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
  },
});
