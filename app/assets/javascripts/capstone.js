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

    var playback = new Capstone.Views.Playback({model: new Capstone.Models.Song()});
    $('#playback').html(playback.$el);
    playback.render();

    // overkill?
    Capstone.playSong = playback.playSong.bind(playback);
    Capstone.pauseSong = playback.pauseSong.bind(playback);

    Backbone.history.start();
  }
};
