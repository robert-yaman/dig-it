Capstone.Views.SongForm = Backbone.View.extend({
  template: JST["song_form"],
  id: "new-song-form",

  events: {
    "submit form" : "submit"
  },

  initialize: function () {
    this.listenTo(Capstone.currentUser, "sync", this.render);

    filepicker.setKey("AyAZuXgnZQEa0BfWshuLAz");
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);

    this.$("#song-artist").val(Capstone.currentUser.escape("username"));

    filepicker.constructWidget(this.$("#filepicker-input")[0]);

    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    var song = new Capstone.Models.Song();
    debugger

    song.save(data.song, {
      success: function(newSong) {
        //this is close_modal from leanModal
        $("#lean_overlay").fadeOut(200);
        $("#new-song-form").css({"display":"none"});

        this.render()
        $("audio").one('loadedmetadata', function(){
          newSong.set("length", Math.ceil($("audio")[0].duration))
          newSong.save();
        });

        Capstone.currentUser.songs().add(newSong);
        Capstone.playSong(newSong);
      }.bind(this)
    });
  }
});
