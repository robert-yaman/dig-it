Capstone.Views.UserListItem = Backbone.CompositeView.extend(
  _.extend({}, Capstone.Mixins.Followable, {
    template: JST["user_list_item"],
    tagName: "li",
    className: "user-list-item list-group-item",

    events: {
      "click button.follow-button" : "toggleFollow"
    },

    initialize: function () {
      this.listenTo(this.model, "sync", function(){
        this.addThreeSongs();
        this.render();
      }.bind(this));
      this.listenTo(this.model.follow(), "change sync", this.render)

      this.addThreeSongs();
    },

    addThreeSongs: function () {
      //TODO: maybe three most popular songs?
      var songs = this.model.songs();
      var cur; var model;

      for (var i = 0; i < 3; i++) {
        cur = songs.at(i)
        if (cur) {
          if (cur.id === (Capstone.currentSong && Capstone.currentSong.id)) {
            model = Capstone.currentSong;
          } else {
            model = cur;
          }

          Capstone.onPageSongs.push(model);
          var view = new Capstone.Views.UserListItemSongItem({model: model});
          this.addSubview(".user-songs-list", view);
        }
      }
    },

    onRender: function () {
      this.installFollowButton();
    },

    render: function () {
      var content = this.template({ user: this.model })
      this.$el.html(content);
      this.attachSubviews();
      this.onRender();
      return this;
    }
  })
);
