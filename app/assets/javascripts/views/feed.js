Capstone.Views.Feed = Backbone.CompositeView.extend({
  template: JST["feed"],
  className: "feed",

  events: {
    "click .recent" : "recentSongs",
    "click .top" : "topSongs",
    "click .new-user" :"newUsers"
  },

  newUsers: function() { //lots of repetition here
    event.preventDefault();
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    var newUsers = new Capstone.Collections.Users();
    newUsers.fetch({data: {new_user: true}});
    var view = new Capstone.Views.UserList({ collection: newUsers });

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", view);
  },

  recentSongs: function(event) {
    event.preventDefault();
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    var recents = new Capstone.Collections.Songs();
    recents.fetch({data: {recent: true}});
    var view = new Capstone.Views.SongList({ collection: recents });

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", view);
  },

  render: function () {
    var content = this.template({ });
    this.$el.html(content);
    this.attachSubviews();

    //click on whatever tab I have chosen to be active
    this.$("li.active").trigger("click");

    return this;
  },

  topSongs: function(event) {
    event.preventDefault();
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    var tops = new Capstone.Collections.Songs();
    tops.fetch({data: {top: true}});
    var view = new Capstone.Views.SongList({ collection: tops });

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", view);
  }
});
