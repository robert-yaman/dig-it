Capstone.Views.PlaybackBar = Backbone.View.extend({
  template: JST["playback_bar"],
  className: "playback_bar",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
