Capstone.Views.UserFeed = Backbone.CompositeView.extend({
  template: JST["user_feed"],
  className: "user_feed",

  events: {
    "click .recent" : "userRecentSongs",
    "click .top" : "userTopSongs",
  },

  userRecentSongs: function(event) {
    event.preventDefault();

    var recents = new Capstone.Collections.Songs();
    recents.fetch({data: {recent: true, which_user: this.model.id }});
    var view = new Capstone.Views.SongList({ collection: recents });

    this._switchFeed(event, view);
  },

  render: function () {
    var content = this.template({ });
    this.$el.html(content);
    this.attachSubviews();

    //click on whatever tab I have chosen to be active
    this.$("li.active").trigger("click");

    return this;
  },

  userTopSongs: function(event) {
    event.preventDefault();

    var tops = new Capstone.Collections.Songs();
    tops.fetch({data: {top: true, which_user: this.model.id }});
    var view = new Capstone.Views.SongList({ collection: tops });

    this._switchFeed(event, view);
  },

  _switchFeed: function (event, view) {
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", view);
  }
});
