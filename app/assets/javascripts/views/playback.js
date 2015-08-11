Capstone.Views.Playback = Backbone.View.extend({
  template: JST["playback"],

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  }
});
