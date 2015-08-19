Capstone.Views.Queue = Backbone.View.extend({
  template: JST["queue"],

  events: {
    "click li .queue-item-song-name" : "playQueuedSong",
    "click .glyphicon-remove" : "removeSong"
  },

  initialize: function (options) {
    this.queue = options.queue;

    this.listenTo(Capstone.queueSong, "queue-change", this.updateQueue);
  },

  render: function () {
    var content = this.template({queue: this.queue, firstSong: this.queue[0]});
    this.$el.html(content);
    return this;
  },

  playQueuedSong: function (event) {
    event.preventDefault();
    this.queue[$(event.currentTarget).data("song-position")].play()
  },

  removeSong: function () {
    event.preventDefault();
    var pos = $(event.currentTarget).data("song-position")
    this.queue.splice(pos, 1)
    this.render();
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
