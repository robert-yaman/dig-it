Capstone.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["user_profile"],

  initialize: function () {
    this.addUserInfo();
    this.addUserSongList();
    this.addFollowingList();

    // this.listenTo(this.model, "sync", this.addFollowingList.bind(this));
  },

  addUserInfo: function () {
    var userInfoView = new Capstone.Views.UserInfo({model: this.model});
    this.addSubview(".user-info", userInfoView);
  },

  addUserSongList: function () {
    var userSongList = new Capstone.Views.SongList({collection: this.model.songs()});
    this.addSubview(".user-songs-list", userSongList);
  },

  addFollowingList: function () {
    var followed_by = new Capstone.Collections.Users();
    followed_by.fetch({data : {six_followed_by : this.model.id }})
    var followingList = new Capstone.Views.FollowingList({collection: followed_by});
    this.addSubview(".followed-by", followingList);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
