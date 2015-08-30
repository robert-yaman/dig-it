Capstone.Views.Feed = Backbone.CompositeView.extend({
  template: JST["feed"],
  className: "feed",

  events: {
    "click .recent" : "recentSongs",
    "click .top" : "topSongs",
    "click .new-user" :"newUsers",
    "click .following" : "following",
    "click .expand-button" : "renderNextCollection"
  },

  initialize: function () {
    //the dataHash will keep track of what sort of data is being displayed (songs or users), how many times the results have been expanded, and any other information that needs to be send to the server
    this.dataHash = {offset: 0};
  },

  fetchNextCollection: function () {
    this.dataHash.offset++;

    if (this.dataHash.dataType === "song") {
      this.nextCollection = new Capstone.Collections.Songs();
    } else if (this.dataHash.dataType === "user") {
      this.nextCollection = new Capstone.Collections.Users();
    }

    this.nextCollection.fetch({data : this.dataHash, success: function(response, collection) {
      if (collection.length === 0) { // no more results to display
        this.$(".expand-button").css("display", "none");
      } else {
        this.$(".expand-button").css("display", "block");
      }
    }.bind(this)});
  },

  following: function (event) {
    event.preventDefault();
    this.dataHash.offset = 0;

    this.dataHash = {following: true, offset: this.dataHash.offset, dataType: "song"};

    var followingSongsView = new Capstone.Collections.Songs();
    followingSongsView.fetch({data: this.dataHash});
    var view = new Capstone.Views.SongList({ collection: followingSongsView });

    this.fetchNextCollection();

    this._switchFeed(event, view);
  },

  newUsers: function(event) {
    event.preventDefault();
    this.dataHash.offset = 0;

    this.dataHash = {new_user: true, offset: this.dataHash.offset, dataType: "user"};

    var newUsers = new Capstone.Collections.Users();
    newUsers.fetch({data: this.dataHash});
    var view = new Capstone.Views.UserList({ collection: newUsers });

    this.fetchNextCollection();

    this._switchFeed(event, view);
  },

  recentSongs: function(event) {
    event.preventDefault();
    this.dataHash.offset = 0;

    this.dataHash = {recent: true, offset: this.dataHash.offset, dataType: "song"};

    var recents = new Capstone.Collections.Songs();
    recents.fetch({data: this.dataHash});
    var view = new Capstone.Views.SongList({ collection: recents });

    this.fetchNextCollection();

    this._switchFeed(event, view);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    //click on whatever tab I have chosen to be active
    this.$("li.active").trigger("click");

    return this;
  },

  renderNextCollection: function () {
    var newView;
    if (this.dataHash.dataType === "song") {
      newView = new Capstone.Views.SongList({ collection: this.nextCollection });
    } else if (this.dataHash.dataType === "user") {
      newView = new Capstone.Views.UserList({ collection: this.nextCollection });
    }

    this.addSubview('.current-list', newView);
    this.fetchNextCollection();
  },

  topSongs: function(event) {
    event.preventDefault();
    this.dataHash.offset = 0;

    this.dataHash = {top: true, offset: this.dataHash.offset, dataType: "song"};

    var tops = new Capstone.Collections.Songs();
    tops.fetch({data: this.dataHash});
    var view = new Capstone.Views.SongList({ collection: tops });

    //the next collection is fetched ahead of time to improve perceived load time
    this.fetchNextCollection();

    this._switchFeed(event, view);
  },

  _switchFeed: function (event, view) {
    this.$(".nav-tabs").children().removeClass("active");
    $(event.currentTarget).addClass("active");

    this.subviews(".current-list").each(function (view) {view.remove(); });
    this.addSubview(".current-list", view);
  }
});
