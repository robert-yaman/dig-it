Capstone.Views.CurrentUserProfile = Backbone.CompositeView.extend({
  template: JST["current_user_profile"],
  //
  // events: {
  //   "click .all-following" : "showAllFollowedUsers"
  // },

  initialize: function () {
    this.addUserInfo();
    this.addUserSongList();
    this.addFollowingList();

    this.listenTo(this.model, "sync", this.addFollowingList.bind(this));
  },

  addUserInfo: function () {
    var userInfoView = new Capstone.Views.CurrentUserInfo({model: this.model});
    this.addSubview(".current-user-info", userInfoView);
  },

  addUserSongList: function () {
    var userSongList = new Capstone.Views.SongList({collection: this.model.songs()});
    this.addSubview(".current-user-songs-list", userSongList);
  },

  addFollowingList: function () {
    //If model.id is 0, the model hasn't been fetched (see BB initialize), if won't have any followed users to fetch
    if (this.model.id === 0) return
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

  // showAllFollowedUsers: function (event) {
  //   event.preventDefault();
  //   $("#lean_overlay").css({"display":"block",opacity:0});
  //   $("#lean_overlay").fadeTo(200, {top:100,overlay:0.5,closeButton:null});
  // }
});
