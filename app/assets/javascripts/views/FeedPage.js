Capstone.Views.FeedPage = Backbone.CompositeView.extend({
  template: JST["feed_page"],

  initialize: function () {
    this.addFeed();
    this.addAbout();
  },

  addFeed: function () {
    var feedView = new Capstone.Views.Feed();
    this.addSubview(".feed", feedView);
  },

  addAbout: function () {
    var aboutView = new Capstone.Views.About();
    this.addSubview(".about", aboutView);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
