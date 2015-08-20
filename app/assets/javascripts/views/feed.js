Capstone.Views.Feed = Backbone.CompositeView.extend({
  template: JST["feed"],
  className: "feed",

  events: {
    "click .recent" : "recentSongs",
    "click .top" : "topSongs",
    "click .new-user" :"newUsers",
    "click .following" : "following",
    "click .expand-button" : "expandCurrentList"
  },

  initialize: function () {
    this.dataHash = {offset: 0}
  },

  expandCurrentList: function () {
    this.dataHash.offset++;
    if (this.dataHash.dataType === "song") {
      var newItems = new Capstone.Collections.Songs();
    } else if (this.dataHash.dataType === "user") {
      var newItems = new Capstone.Collections.Users();
    }

    newItems.fetch({data : this.dataHash})
    var newView = new Capstone.Views.SongList({ collection: newItems });
    //check if these in the onPageSongs collections
    this.addSubview('.current-list', newView);
  },

  following: function (event) {
    event.preventDefault();

    this.dataHash = {following: true, offset: this.dataHash.offset, dataType: "song"};

    var followingSongsView = new Capstone.Collections.Songs();
    followingSongsView.fetch({data: this.dataHash});
    var view = new Capstone.Views.SongList({ collection: followingSongsView });

    this._switchFeed(event, view);
  },

  newUsers: function(event) {
    event.preventDefault();

    this.dataHash = {new_user: true, offset: this.dataHash.offset, dataType: "user"};

    var newUsers = new Capstone.Collections.Users();
    newUsers.fetch({data: this.dataHash});
    var view = new Capstone.Views.UserList({ collection: newUsers });

    this._switchFeed(event, view);
  },

  recentSongs: function(event) {
    event.preventDefault();

    this.dataHash = {recent: true, offset: this.dataHash.offset, dataType: "song"};

    var recents = new Capstone.Collections.Songs();
    recents.fetch({data: this.dataHash});
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

  topSongs: function(event) {
    event.preventDefault();

    this.dataHash = {top: true, offset: this.dataHash.offset, dataType: "song"};

    var tops = new Capstone.Collections.Songs();
    tops.fetch({data: this.dataHash});
    var view = new Capstone.Views.SongList({ collection: tops });

    this._switchFeed(event, view);
  },

  _switchFeed: function (event, view) {
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    this.dataHash.offset = 0

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", view);
  }
});
