Capstone.Views.CurrentUserProfile = Backbone.CompositeView.extend({
  template: JST["current_user_profile"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
