Capstone.Views.PlaybackBar = Backbone.View.extend({
  template: JST["playback_bar"],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderPlaybackBar();
    return this;
  },

  renderPlaybackBar: function () {
    var heatmap = h337.create({container: $(".playback-bar")[0]})
    //temp
    heatmap.setData({max: 15, data: [{ x: 800, y: 2, value: 15}, { x: 700, y: 2, value: 15}, { x: 300, y: 2, value: 10}]})
  }
});
