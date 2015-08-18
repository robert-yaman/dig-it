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
    this.renderHeatmaps();
    return this;
  },

  renderHeatmaps: function () {
    this.model.fetch({data: { canvas_width : this.$el.width() } , success: function(model, response) {
      console.log("heatmap rendered")
      // $(".heatmap-canvas").remove(); // don't need to remove anymore since removing entire view when switching songs
      var heatmap = h337.create({
        container: $(".playback-bar")[0],
        radius: response.radius,
        blur: .9,
        gradient: {
          '.25': '#0094D2', //light-blue
          '.5' : '#4CBB17', //dark - green
          '.65' : '#66FF33', // light-green
          '.7': '#FF8C00', //theme-orange
          '.83' : 'yellow',
          '.95': 'red'
        }
      });

      //stretch the canvas so the heatmap appears 2D
      $(".playback-bar canvas").css("height", this.model.get("length") * 15);

      //storing info for life data update later
      this.heatmap = heatmap
      this.radius = response.radius;
      this.max = response.max

      delete response.radius;

      //populate heatmap
      heatmap.setData(response);

      // console.log("interaction heatmap rendered")
      // var interactionHeatmap = h337.create({
      //   container: $(".playback-bar")[0],
      //   radius: response.radius * 2, //for more feedback
      //   blur: .9,
      //   gradient: {
      //     '.25': '#0094D2', //light-blue
      //     '.5' : '#4CBB17', //dark - green
      //     '.65' : '#66FF33', // light-green
      //     '.7': '#FF8C00', //theme-orange
      //     '.83' : 'yellow',
      //     '.95': 'red'
      //   }
      // });


      //this will be the heatmap that is modified when user presses dig button

    }.bind(this), silent: true}); //silent true is to avoid infinite loop with listener made in initialize (should I also create that conditional for list items?)
  }
});
