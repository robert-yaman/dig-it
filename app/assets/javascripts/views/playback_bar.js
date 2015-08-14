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
    this.model.fetch({data: { heatmap_length : this.$el.width() } , success: function(model, response) {
      var heatmap = h337.create({container: $(".playback-bar")[0]})
      heatmap.setData(response)
    }});
  }
});
