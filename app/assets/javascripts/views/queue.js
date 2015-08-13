Capstone.Views.Queue = Backbone.View.extend({
  template: JST["queue"],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
