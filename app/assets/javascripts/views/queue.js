Capstone.Views.Queue = Backbone.View.extend({
  template: JST["queue"],

  initialize: function (options) {
    this.queue = options.queue;

    this.listenTo(Capstone.queueSong, "queue-change", this.updateQueue);
  },

  render: function () {
    var content = this.template({queue: this.queue, firstSong: this.queue[0]});
    this.$el.html(content);
    return this;
  },

  updateQueue: function () {
    if (Capstone.queueSong.get("playNext")){
      this.queue.unshift(new Capstone.Models.Song(Capstone.queueSong.attributes))
    } else {
      this.queue.push(new Capstone.Models.Song(Capstone.queueSong.attributes))
    }
    this.render()
  }
});
