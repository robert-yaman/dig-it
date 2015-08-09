//deprecated

Capstone.Views.SignUp = Backbone.View.extend({
  template: JST["sign_up"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
