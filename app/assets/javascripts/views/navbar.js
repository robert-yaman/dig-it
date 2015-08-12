Capstone.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],

  tagname: "nav",
  id: "navbar",
  className: "navbar navbar-default navbar-fixed-top",

  initialize: function () {
    this.listenTo(Capstone.currentUser, "sync", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
