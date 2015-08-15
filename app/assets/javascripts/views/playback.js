Capstone.Views.Playback = Backbone.CompositeView.extend({
  template: JST["playback"],

  initialize: function() {
    //maybe move the button to the song-info -- or make its own view!
    this.installListeners();

    //do these here to achieve consistent positioning b/w active and inactive
    this.replaceQueue();
    this.replaceSongInfo();

    this.addSubview(".time-counter", new Capstone.Views.TimeCounter());
  },

  events: {
    "click .playback-play-button" : "playOrPause",
    "click .vol" : "changeVol"
  },

  activate: function () {
    this.$(".playback-play-button").addClass("playing");
    this.$(".playback-play-button").removeClass("glyphicon-play");
    this.$(".playback-play-button").addClass("glyphicon-pause");
  },

  changeVol: function (event) {
    if (!this.$("nav").hasClass("active")) return;
    var $volBar = $(event.currentTarget);
    this.$(".vol-bar").each(function() {
      if ($(this).data("vol-level") <= $volBar.data("vol-level")) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });

    this.$(".audio-tag")[0].volume = $volBar.data("vol-level") / 6;
  },

  deactivate: function () {
    this.$(".playback-play-button").removeClass("playing");
    this.$(".playback-play-button").removeClass("glyphicon-pause");
    this.$(".playback-play-button").addClass("glyphicon-play");
  },

  digNow: function () {
    console.log("dug at " + this.secondsCounter);
    //add to model for db
    this.model.get("digs")[this.secondsCounter]++;

    //add to canvas for live update
    var heatmapView = this.subviews(".playback-bar").first();
    heatmapView.heatmap.addData({x : this.secondsCounter * heatmapView.radius, y : 0, value: heatmapView.max / 9});
  },

  installListeners: function () {
    //must call again when model is switched
    this.listenTo(this.model, "play", this.activate);
    this.listenTo(this.model, "pause", this.deactivate);
  },

  playOrPause: function (event) {
    if (!this.$("nav").hasClass("active")) return
    if (this.$(".playback-play-button").hasClass("playing")) {
      this.model.pause();
    } else {
      this.model.play();
    }
  },

  replaceQueue: function () {
    if (this.subviews(".queue").first()) {
      this.removeSubview(".queue", this.subviews(".queue").first());
    }
    var view = new Capstone.Views.Queue();
    this.addSubview(".queue", view);
  },

  replacePlaybackBar: function () {
    if (this.subviews(".playback-bar").first()) {
      this.removeSubview(".playback-bar", this.subviews(".playback-bar").first());
    }
    var view = new Capstone.Views.PlaybackBar({model: this.model});
    this.addSubview(".playback-bar", view);
  },

  replaceSongInfo: function () {
    if (this.subviews(".playback-song-info").first()) {
      this.removeSubview(".playback-song-info", this.subviews(".playback-song-info").first());
    }
    var view = new Capstone.Views.PlaybackSongInfo({model: this.model});
    this.addSubview(".playback-song-info", view);
  },

  pauseSong: function(song) {
    this.$(".audio-tag")[0].pause();
    this.wrapUpSong();
    Capstone.currentSong.playing = false;
    //re-render the heatmap (actually, do I need to do this?)
    this.subviews(".playback-bar").first().render();
  },

  playSong: function(song) {
    //if this is the first song played
    if (!this.$("nav").hasClass("active")) {
      this.$("nav").addClass("active");
      this.$("#dig-button").html("DIG");
      this.$(".playback-play-button").addClass("playing").addClass("glyphicon-pause");
      this.setUpVolBars();

    }

    if (Capstone.currentSong && Capstone.currentSong.id === song.id) {
      //unpause current song
      this.$(".audio-tag")[0].play();
    } else {
      //wrap up currently playing Song
      if (Capstone.currentSong) this.wrapUpSong()
      
      this.subviews(".time-counter").first().time = "0:00"
      this.subviews(".time-counter").first().render();

      this.$(".audio-tag").attr("src", song.escape("file_path"))
      this.$(".audio-tag")[0].play();

      this.secondsCounter = 0

      Capstone.currentSong && Capstone.currentSong.trigger("pause");
      Capstone.currentSong = song;
      this.model = song;
      this.installListeners();
      this.replacePlaybackBar();
      this.replaceSongInfo();
    }

    Capstone.currentSong.playing = true
    this.setDigInterval();
  },

  setDigInterval: function () {
    //remember to remove listener on stop
    $("#dig-button").click(this.digNow.bind(this))
    this.digInterval = setInterval(function(){
      this.secondsCounter++
      if (this.secondsCounter === this.model.get("length")) {
        this.model.pause();
        Capstone.currentSong = null;
      }
      this.subviews(".time-counter").first().time = Capstone.timify(this.secondsCounter);
      this.subviews(".time-counter").first().render();
      console.log(this.secondsCounter)
    }.bind(this), 1000)
  },

  setUpVolBars: function () {
    this.$(".vol-bar").each(function() {
      if ($(this).data("vol-level") <= 4) {
        $(this).addClass("active");
      }
    });

    this.$(".audio-tag")[0].volume = 4 / 6
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  wrapUpSong: function () {
    clearInterval(this.digInterval)
    $("#dig-button").off("click");
    //Can't do this here b/c won't be able to continue playing
    // Capstone.currentSong = null;
    this.model.save({}, {silent: true});
  }
});
