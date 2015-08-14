Capstone.Views.PlaybackBar = Backbone.View.extend({
  template: JST["playback_bar"],

  initialize: function() {
    this.model.on("sync", function(model, response, options) {
      if (options.silent) return
      this.render()
    }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderPlaybackBar();
    return this;
  },

  renderPlaybackBar: function () {
    this.$("canvas").remove();
    this.model.fetch({data: { canvas_width : this.$el.width() } , success: function(model, response) {
      var heatmap = h337.create({container: $(".playback-bar")[0], radius: response.radius});
      delete response.radius;
      heatmap.setData(response);
    }, silent: true}); //silent true is to avoid infinite loop with listener made in initialize (should I also create that conditional for list items?)
  }
});
