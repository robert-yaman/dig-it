Capstone.Views.About = Backbone.View.extend({
  template: JST["about"],

  initialize: function() {
    this.listenTo(Capstone.currentUser, "sync", this.render)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
