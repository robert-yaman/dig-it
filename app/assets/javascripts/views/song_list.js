Capstone.Views.SongList = Backbone.CompositeView.extend({
  template: JST["song_list"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addSong);
    this.listenTo(this.collection, "remove", this.removeSong);

    this.addSongs();
  },

  addSong: function(song) {
    var view
    if (song.id === (Capstone.currentSong && Capstone.currentSong.id)) {
      view = new Capstone.Views.SongListItem({model: Capstone.currentSong});
    } else {
      view = new Capstone.Views.SongListItem({model: song});
    }
    this.addSubview(".songs-list", view);
  },

  addSongs: function () {
    this.collection.each(this.addSong.bind(this));
  },

  removeSong: function(song) {
    this.removeModelSubview(".songs-list", song);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    this.collection.each(function(song) {Capstone.onPageSongs.push(song)})

    return this;
  }
});
