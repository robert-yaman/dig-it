Capstone.Views.FollowingListItem = Backbone.View.extend({
  template: JST["following_list_item"],
  className: "following-list-item",
  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  }
});
