window.Capstone = {
  Models: {},
  Collections: {},
  Views: {Modals: {}},
  Routers: {},
  initialize: function(options) {
    window.Capstone.currentUser = new Capstone.Models.CurrentUser();
    window.Capstone.currentUser.fetch();

    var userSearchResults = new Capstone.Collections.Users();
    var songSearchResults = new Capstone.Collections.Songs();

    $("#app-navbar").html(new Capstone.Views.Navbar({
      userSearchResults: userSearchResults,
      songSearchResults: songSearchResults
    }).render().$el);

    var $rootEl = $('#content');
    new Capstone.Routers.AppRouter({
      $rootEl: $rootEl,
      userSearchResults: userSearchResults,
      songSearchResults: songSearchResults
    });

    //this model represents the song most recently added to the queue. Not a collection b/c I want to allow duplicates of the same song on the queue
    Capstone.queueSong = new Capstone.Models.Song();

    var playback = new Capstone.Views.Playback({model: new Capstone.Models.Song()});
    $('#playback').html(playback.$el);
    playback.render();

    // overkill?
    Capstone.playSong = playback.playSong.bind(playback);
    Capstone.pauseSong = playback.pauseSong.bind(playback);

    // So that models representing the same song are the same model. Array so that two can both be in w/ same id
    Capstone.onPageSongs = [];

    Backbone.history.start();
  }
};
