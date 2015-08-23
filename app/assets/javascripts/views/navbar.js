Capstone.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],

  tagname: "nav",
  id: "navbar",
  className: "navbar navbar-default navbar-fixed-top",

  events: {
    "click button.search" : "fireSearch"
  },

  initialize: function (options) {
    this.userSearchResults = options.userSearchResults;
    this.songSearchResults = options.songSearchResults;

    this.listenTo(Capstone.currentUser, "sync", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.setupNewSongbutton();
    // this.setupModalSearchViews();
    return this;
  },

  fireSearch: function(event) {
    // alert("in fireSearch")
    event.preventDefault();
    var searchString = $("#search-bar").val();
    if (searchString === "") return;

    //for fetching more data later
    this.userSearchResults.query = decodeURI(searchString);
    this.songSearchResults.query = decodeURI(searchString);

    this.userSearchResults.fetch({ data : {query: decodeURI(searchString)} })
    this.songSearchResults.fetch({ data : {query: decodeURI(searchString)} })

    Backbone.history.navigate("#search", {trigger: true})
    //in case searching from the search page
    Capstone.appRouter.search()
    $("#search-bar").val("");
  },

  setupNewSongbutton: function () {
    var song = new Capstone.Models.Song();
    var view = new Capstone.Views.SongForm({model: song});
    $("body").append(view.$el);
    view.$el.css("display", "none") //setting up modal
    view.render();
    $("#new-song-button").leanModal();
  }
});
