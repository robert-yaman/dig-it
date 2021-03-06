Capstone.Views.SongForm = Backbone.View.extend({
  template: JST["song_form"],
  id: "new-song-form",

  events: {
    "submit form" : "submit"
  },

  initialize: function () {
    this.listenTo(Capstone.currentUser, "sync", this.render);
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
    song.save(data.song, {
      success: function(newSong) {

        //this is close_modal from leanModal
        $("#lean_overlay").fadeOut(200);
        $("#new-song-form").css({"display":"none"});

        //reset fields
        this.render();

        //store the length in the db
        $("audio").one('loadedmetadata', function() {
          newSong.set("length", Math.ceil($("audio")[0].duration));
          newSong.save({}, {success: function (newerSong) {
            // so heatmap knows to rerender
            newSong.trigger("gotDigs");
            Capstone.newerSong = newerSong;
            newSong.set("digs", newerSong.get("digs"));
          }});
        });

        //won't actually play
        newSong.play();
        Capstone.currentUser.songs().add(newSong);
      }.bind(this),

      error: function(model, response) {
        if (response.responseText.match("Name can't be blank")) {
          this.$("#song-name").addClass("error");
        }

        if (response.responseText.match("File path can't be blank")) {
          if (this.$(".error-message").length === 0) {
            var $error = $("<p class=error-message>Please choose a file</p>");
            $error.css("color", "red")
                  .css("margin-top", 5)
                  .css("margin-bottom", 5);
            this.$(".form-group.fp").append($error);
          }
        }

      }.bind(this)
    });
  }
});
