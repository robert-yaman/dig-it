Capstone.Views.Feed = Backbone.CompositeView.extend({
  template: JST["feed"],
  className: "feed",

  events: {
    "click .some-songs" : "someSongs",
    "click .some-users" : "someUsers"
  },

  initialize: function () {
    //this is temp
    var user = new Capstone.Models.User({id: 1});
    user.fetch();
    var view = new Capstone.Views.SongList({ collection: user.songs() });

    this.addSubview(".current-list", view)
  },

  render: function () {
    var content = this.template({ });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  someSongs: function(event) {
    event.preventDefault();
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    var user = new Capstone.Models.User({id: 1});
    user.fetch();
    var view = new Capstone.Views.SongList({ collection: user.songs() });

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", view);
  },

  someUsers: function(event) {
    event.preventDefault();
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    var users = new Capstone.Collections.Users();
    users.fetch();
    var userList = new Capstone.Views.UserList({collection: users});

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", userList);
  }
});
