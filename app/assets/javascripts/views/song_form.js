Capstone.Views.SongForm = Backbone.View.extend({
  template: JST["song_form"],
  id: "new-song-form",

  events: {
    "submit form" : "submit"
  },

  //should I give this a user model that represents current user?
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
    var newSong = new Capstone.Models.Song();

    newSong.save(data.song, {
      success: function(newSong) {
        //this is close_modal from leanModal
        $("#lean_overlay").fadeOut(200);
        $("#new-song-form").css({"display":"none"});
        //

        this.render()

        Capstone.currentUser.songs().add(newSong);
        Capstone.playSong(newSong);
      }.bind(this)
    });
  }
});
