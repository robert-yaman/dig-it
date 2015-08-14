Capstone.Views.PlaybackBar = Backbone.View.extend({
  template: JST["playback_bar"],

  initialize: function() {
    //Don't need to listen to model -- will explicitely render when needed
    // this.model.on("sync", function(model, response, options) {
    //   if (response.heatmap) return
    //   this.render()
    // }.bind(this));
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderPlaybackBar();
    return this;
  },

  renderPlaybackBar: function () {
    this.model.fetch({data: { canvas_width : this.$el.width() } , success: function(model, response) {
      console.log("heatmap reset")
      $(".heatmap-canvas").remove();
      var heatmap = h337.create({container: $(".playback-bar")[0], radius: response.radius});

      //storing info for live update later
      this.heatmap = heatmap
      this.radius = response.radius;
      this.max = response.max

      //stretch the canvas so the heatmap appears 2D
      $(".playback-bar canvas").css("height", this.model.get("length") * 15);

      delete response.radius;
      heatmap.setData(response);
    }.bind(this), no_heatmap: true}); //silent true is to avoid infinite loop with listener made in initialize (should I also create that conditional for list items?)
  }
});
