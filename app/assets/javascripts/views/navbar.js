Capstone.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],

  tagname: "nav",
  id: "navbar",
  className: "navbar navbar-default navbar-fixed-top",

  events: {
    "click button.search" : "fireSearch"
  },

  initialize: function () {
    this.listenTo(Capstone.currentUser, "sync", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  fireSearch: function(event) {
    event.preventDefault();
    var searchString = $("#search-bar").val();
    if (searchString === "") return;

    Backbone.history.navigate("#search/" + searchString, {trigger: true}) ///need to encode
    var searchString = $("#search-bar").val("");
  }
});
