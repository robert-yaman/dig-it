Capstone.Views.Queue = Backbone.View.extend({
  template: JST["queue"],

  initialize: function (options) {
    this.queue = options.queue;

    this.listenTo(Capstone.queueSong, "queue-change", this.updateQueue);
  },

  render: function () {
    var content = this.template({queue: this.queue});
    this.$el.html(content);
    return this;
  },

  updateQueue: function () {
    if (Capstone.queueSong.get("playNext")){
      this.queue.unshift(Capstone.queueSong)
    } else {
      this.queue.push(Capstone.queueSong)
    }
    this.render()
  }
});
