Capstone.Views.PlaybackBar = Backbone.View.extend({
  template: JST["playback_bar"],

  initialize: function () {
    this.listenTo(this.model, "gotDigs", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderHeatmaps();
    return this;
  },

  renderHeatmaps: function () {
    this.model.fetch({data: { canvas_width : this.$el.width() } , success: function(model, response) {
      // $(".heatmap-canvas").remove(); // don't need to remove anymore since removing entire view when switching songs
      var heatmap = h337.create({
        container: $(".playback-bar")[0],
        radius: response.radius,
        blur: 0.7,
        minOpacity: 0.45,
        maxOpacity: 1,
        gradient: {
          '.15': '#0094D2', //light-blue
          '.3' : '#4CBB17', //dark - green
          '.45' : '#66FF33', // light-green
          '.5': '#FF8C00', //theme-orange
          '.68' : 'yellow',
          '.83': 'red'
        }
      });

      //stretch the canvas so the heatmap appears 2D
      $(".playback-bar canvas").css("height", this.model.get("length") * 15);

      //storing info for life data update later
      this.heatmap = heatmap;
      this.radius = response.radius;
      this.max = response.max;

      delete response.radius;

      //populate heatmap
      heatmap.setData(response);

      //getting set as side effect
      delete this.model.attributes.data;
    }.bind(this), silent: true}); //silent true is to avoid infinite loop with listener made in initialize (should I also create that conditional for list items?)
  }
});
