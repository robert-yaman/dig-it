Capstone.Views.Leaderboard = Backbone.CompositeView.extend({
  template: JST["leaderboard"],

  events: {
    "click .leader-list-item:first-child li.user-list-item-song-item:first-child button" : "runSecondTutorial"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addLeader);
    this.listenTo(this.collection, "remove", this.removeLeader);

    this.addLeaders();
  },

  addLeader: function(user) {
    var view = new Capstone.Views.LeaderListItem({model: user});
    this.addSubview(".leaders-list", view);
  },

  addLeaders: function () {
    this.collection.each(this.addLeader.bind(this));
  },

  removeLeader: function(user) {
    this.removeModelSubview(".leaders-list", user);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    return this;
  },

  runSecondTutorial: function () {
    Capstone.runSecondTutorial();
  }
});
