Capstone.Views.CurrentUserProfile = Backbone.CompositeView.extend({
  template: JST["current_user_profile"],

  initialize: function () {
    this.addUserInfo();
    this.addUserSongList();
  },

  addUserInfo: function () {
    var userInfoView = new Capstone.Views.CurrentUserInfo({model: this.model});
    this.addSubview(".current-user-info", userInfoView);
  },

  addUserSongList: function () {
    var userSongList = new Capstone.Views.SongList({collection: this.model.songs()});
    this.addSubview(".current-user-songs-list", userSongList);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
