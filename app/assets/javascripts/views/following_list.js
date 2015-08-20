Capstone.Views.FollowingList = Backbone.CompositeView.extend({
  template: JST["following_list"],

  events: {
    "click a.all-following" : "renderFollowingUsers"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addUser);

    this.addUsers();
  },

  addUser: function(user) {
    var view = new Capstone.Views.FollowingListItem({model: user});
    this.addSubview(".followed-by-list", view);
  },

  addUsers: function () {
    this.collection.each(this.addUser.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.$("a.all-following").leanModal(); //not using this the way it was meant...
    return this;
  },

  renderFollowingUsers: function (event) {
    event.preventDefault();
    var followedUsers = new Capstone.Collections.Users();
    followedUsers.fetch({data : {followed_by : this.model.id}})
    Capstone.modalSearchView.collection = followedUsers;
    Capstone.modalSearchView.configUserList();
    Capstone.modalSearchView.render()
    Capstone.modalSearchView.$el.css("display", "block")
    Capstone.modalSearchView.$el.addClass("showing")
  }
});
