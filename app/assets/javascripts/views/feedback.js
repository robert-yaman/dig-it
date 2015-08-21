Capstone.Views.Feedback = Backbone.View.extend({
  template: JST["feedback"],
  classname: "feedback",

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
