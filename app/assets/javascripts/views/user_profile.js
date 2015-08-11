Capstone.Views.UserProfile = Backbone.CompositeView.extend({
  template: JST["user_profile"],

  initialize: function () {
    this.addUserInfo();
    this.addUserSongList();
  },

  addUserInfo: function () {
    var userInfoView = new Capstone.Views.UserInfo({model: this.model});
    this.addSubview(".user-info", userInfoView);
  },

  addUserSongList: function () {
    var userSongList = new Capstone.Views.SongList({collection: this.model.songs()});
    this.addSubview(".user-songs-list", userSongList);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
