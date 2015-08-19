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
    var content = this.template({queue: this.queue, firstSong: this.queue[this.queue.length - 1]});
    this.$el.html(content);
    $( "#queue-sortable" ).sortable({
      update: this.recalcQueue.bind(this),
      placeholder: "sortable-placeholder"
    });
    $( "#queue-sortable" ).disableSelection();
    return this;
  },

  playQueuedSong: function (event) {
    event.preventDefault();
    this.queue[$(event.currentTarget).data("song-position")].play()
  },

  recalcQueue: function () {
    var view = this
    var order = []
    //make a copy of the queue in the original array, then delete the original elements (needs to mutate b/c shared with parent view)

    //first get the order
    this.$(".queue-item-song-name").each(function(){
      order.push($(this).data("song-position"))
    });

    var oldQueue = this.queue.slice()
    order.forEach(function(index){
      this.queue.push(oldQueue[index])
    }.bind(this));

    this.queue.splice(0, this.queue.length / 2)
    this.render();
  },

  removeSong: function () {
    event.preventDefault();
    var pos = $(event.currentTarget).data("song-position")
    this.queue.splice(pos, 1)
    this.render();
  },

  updateQueue: function () {
    if (Capstone.queueSong.get("playNext")){
      this.queue.push(new Capstone.Models.Song(Capstone.queueSong.attributes))
    } else {
      this.queue.unshift(new Capstone.Models.Song(Capstone.queueSong.attributes))
    }
    Capstone.queueSong.set("playNext", false)
    this.render()
  }
});
