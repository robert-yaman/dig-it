Capstone.Views.TimeCounter = Backbone.View.extend({
  template: JST["time_counter"],

  render: function () {
    var content = this.template({currentTime: this.time});
    this.$el.html(content);
    return this;
  }
});
