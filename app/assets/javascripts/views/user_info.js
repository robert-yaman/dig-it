Capstone.Views.UserInfo = Backbone.View.extend({
  template: JST["user_info"],
  className: "user-info",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }
});
