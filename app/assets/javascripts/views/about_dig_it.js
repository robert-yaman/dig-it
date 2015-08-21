Capstone.Views.AboutDigIt = Backbone.View.extend({
  template: JST["about_dig_it"],
  className: "about-dig-it",

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
