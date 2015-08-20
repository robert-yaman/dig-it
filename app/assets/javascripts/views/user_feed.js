Capstone.Views.UserFeed = Backbone.CompositeView.extend({
  template: JST["user_feed"],
  className: "user-feed",

  events: {
    "click .recent" : "userRecentSongs",
    "click .top" : "userTopSongs",
    "click a.all-songs" : "renderAllSongs"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
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

    this.$("a.all-songs").leanModal(); //not using this the way it was meant...

    return this;
  },

  renderAllSongs: function (event) {
    event.preventDefault();
    var allSongs = new Capstone.Collections.Songs();
    allSongs.fetch({data : {which_user : this.model.id}})
    Capstone.modalSearchView.collection = allSongs;
    Capstone.modalSearchView.configSongList();
    Capstone.modalSearchView.render()
    Capstone.modalSearchView.$el.css("display", "block")
    Capstone.modalSearchView.$el.addClass("showing")
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
