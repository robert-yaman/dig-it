Capstone.Views.FeedPage = Backbone.CompositeView.extend({
  template: JST["feed_page"],

  initialize: function () {
    this.addFeed();
    this.addAbout();
    this.addLeaderboard();
  },

  addAbout: function () {
    var aboutView = new Capstone.Views.About();
    this.addSubview(".about", aboutView);
  },

  addLeaderboard: function () {
    var leaders = new Capstone.Collections.Users();
    leaders.fetch({data : { leaders : true } })

    var leaderboard = new Capstone.Views.Leaderboard({collection: leaders});
    this.addSubview(".leaderboard", leaderboard);
  },

  addFeed: function () {
    var feedView = new Capstone.Views.Feed();
    this.addSubview(".feed", feedView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    if (Capstone.tutorialMode === 1) Capstone.runFirstTutorial();
    return this;
  }
});
