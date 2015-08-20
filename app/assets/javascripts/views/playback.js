Capstone.Views.Playback = Backbone.CompositeView.extend({
  template: JST["playback"],

  initialize: function() {
    this.digsGiven = 0;
    this.queue = []

    //maybe move the button to the song-info -- or make its own view!
    this.installListeners();

    //do these here to achieve consistent positioning b/w active and inactive
    this.replaceQueue();
    this.replaceSongInfo();

    this.addSubview(".time-counter", new Capstone.Views.TimeCounter());
  },

  events: {
    "click .playback-play-button" : "playOrPause",
    "click .vol" : "changeVol",
    "click .glyphicon-fast-backward" : "restartSong",
    "click .glyphicon-fast-forward" : "nextSong"
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
    // this.lightUp();

    this.digsGiven++
    //add to model for db
    this.model.get("digs")[this.secondsCounter]++;

    //add to canvas for live update
    var heatmapView = this.subviews(".playback-bar").first();

    heatmapView.heatmap.addData({x : this.secondsCounter * heatmapView.radius, y : 0, value: heatmapView.max / 4, radius: heatmapView.radius * 1.6}); //changing radius for more instant feedback
  },

  installListeners: function () {
    //must call again when model is switched
    this.listenTo(this.model, "play", this.activate);
    this.listenTo(this.model, "pause", this.deactivate);
  },

  jumpSpots: function(event) {
    var proportionOfSong = event.offsetX / $(".playback-bar").width();
    var newSecondValue = Math.floor(proportionOfSong * Capstone.currentSong.get("length"));
    var newFpsCounter = Math.floor(((proportionOfSong * Capstone.currentSong.get("length")) - newSecondValue) / this.fps)

    this.$("audio")[0].currentTime = newSecondValue;
    this.secondsCounter = newSecondValue;
    this.fpsCounter = newFpsCounter;

    //re-render time-counter
    this.subviews(".time-counter").first().time = Capstone.timify(newSecondValue)
    this.subviews(".time-counter").first().render();

    //re-render visual pointers in case paused
    if (!Capstone.currentSong.playing) {
      var pointerPos = (this.$(".playback-bar").width() * (this.secondsCounter * this.fps + this.fpsCounter)) / (Capstone.currentSong.get("length") * this.fps)
      this.$(".playback-pointers").css("transform", "translate(" + pointerPos + "px,0)")
    }
  },

  nextSong: function (event) {
    event && event.preventDefault();
    if (this.queue[0]) {
      this.queue[this.queue.length - 1].play()
      this.queue.pop();
      this.subviews(".queue").first().render();
    }
  },

  pauseSong: function(song) {
    this.$(".audio-tag")[0].pause();
    this.wrapUpSong();
    Capstone.currentSong.playing = false;
    //re-render the heatmap (actually, do I need to do this?)
    // this.subviews(".playback-bar").first().render();
  },

  playOrPause: function (event) {
    if (!this.$("nav").hasClass("active")) return
    if (this.$(".playback-play-button").hasClass("playing")) {
      this.model.pause();
    } else {
      this.model.play();
    }
  },

  playSong: function(song) {
    //if this is the first song played
    if (!this.$("nav").hasClass("active")) {
      this.$("nav").addClass("active");
      this.$("#dig-button").html("DIG");
      this.$(".playback-play-button").addClass("playing").addClass("glyphicon-pause");
      this.setUpVolBars();
      this.setUpPointers();
    }

    if (Capstone.currentSong && Capstone.currentSong.id === song.id) {
      //unpause current song
      this.$(".audio-tag")[0].play();
      this.setDigInterval();
    } else {
      //disable quick clicks by user
      Capstone.dontPlayMoreSongs = true;

      //wrap up currently playing Song
      if (Capstone.currentSong) this.model.pause();

      Capstone.currentSong = song;
      this.model = song;

      this.subviews(".time-counter").first().time = "0:00"
      this.subviews(".time-counter").first().render();

      this.$(".playback-pointers").css("transform", "translate(0, 0)")

      this.secondsCounter = 0
      this.fpsCounter = 0

      this.$(".audio-tag").attr("src", song.escape("file_path"))
      this.$(".audio-tag")[0].play();

      //need to install new listeners because the model has changed
      this.installListeners();
      this.replacePlaybackBar();
      this.replaceSongInfo();
      this.$(".audio-tag").one("canplaythrough", function (){
        Capstone.dontPlayMoreSongs = false;
        this.setDigInterval();
      }.bind(this));
    }

    Capstone.currentSong.playing = true
  },

  replaceQueue: function () {
    if (this.subviews(".queue").first()) {
      this.removeSubview(".queue", this.subviews(".queue").first());
    }
    var view = new Capstone.Views.Queue({queue: this.queue});
    this.addSubview(".queue", view);
  },

  replacePlaybackBar: function () {
    //remove heatmaps
    $("canvas.heatmap-canvas").remove()

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

  restartSong: function (event) {
    event.preventDefault();
    //worth combining with jumpSpots
    this.$("audio")[0].currentTime = 0;
    this.secondsCounter = 0;
    this.fpsCounter = 0;

    //re-render time-counter
    this.subviews(".time-counter").first().time = Capstone.timify(0)
    this.subviews(".time-counter").first().render();

    //re-render visual pointers in case paused
    if (!Capstone.currentSong.playing) {
      this.$(".playback-pointers").css("transform", "translate(0, 0)")
    }
  },

  setDigInterval: function () {
    var fps = this.fps = 12
    this.fpsCounter = this.fpsCounter || 0
    var pointerPos

    //install dig button and song jumping
    this.$("#dig-button").click(this.digNow.bind(this))
    this.$(".playback-bar").click(this.jumpSpots.bind(this));
    this.digInterval = setInterval(function(){
      this.fpsCounter++
      this.fpsCounter = this.fpsCounter % fps
      //reassigning each time in case browser is resized. In terms of secondsCounter to facilitate pausing
      pointerPos = (this.$(".playback-bar").width() * (this.secondsCounter * fps + this.fpsCounter)) / (Capstone.currentSong.get("length") * fps)
      this.$(".playback-pointers").css("transform", "translate(" + pointerPos + "px,0)")

      //if on the second mark
      if (this.fpsCounter === fps - 1) {
        this.secondsCounter++

        //song is over
        if (this.secondsCounter === this.model.get("length")) {
          this.model.pause();
          //move to the next song in the queue if there is one
          if (this.queue[0]) {
            this.nextSong();
          } else {
            Capstone.currentSong = null;
          }
        }
        //update time counter
        this.subviews(".time-counter").first().time = Capstone.timify(this.secondsCounter);
        this.subviews(".time-counter").first().render();
      }
    }.bind(this), 1000 / fps)
  },

  setUpPointers: function () {
    this.$(".playback-pointers").html("<span class='glyphicon glyphicon-chevron-down'></span><span class='glyphicon glyphicon-chevron-up'></span>")
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
    this.$("#dig-button").off("click");

    //don't update if no new digs
    if (this.digsGiven > 0) {
      this.model.save({digs_given: this.digsGiven}, {silent: true});
    }

    //these digs now accounted for
    this.digsGiven = 0;
  }
});
