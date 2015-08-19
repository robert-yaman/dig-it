Capstone.Views.UserList = Backbone.CompositeView.extend({
  template: JST["user_list"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addUser);
    this.listenTo(this.collection, "remove", this.removeUser);

    this.addUsers();
  },

  addUser: function(user) {
    var view = new Capstone.Views.UserListItem({model: user});
    this.addSubview(".users-list", view);
  },

  addUsers: function () {
    this.collection.each(this.addUser.bind(this));
  },

  removeUser: function(user) {
    this.removeModelSubview(".users-list", user);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  }
});
