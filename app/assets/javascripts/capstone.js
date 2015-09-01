window.Capstone = {
  Models: {},
  Collections: {},
  // Views: {Modals: {}},
  Views: {},
  Routers: {},
  Mixins: {},
  initialize: function(options) {
    //id 0 so that it will go to the right controller action
    window.Capstone.currentUser = new Capstone.Models.User({id: 0});
    window.Capstone.currentUser.fetch({
      data : {current: true, extra_profile_info: true}
    });

    var userSearchResults = new Capstone.Collections.Users();
    var songSearchResults = new Capstone.Collections.Songs();

    $("#app-navbar").html(new Capstone.Views.Navbar({
      userSearchResults: userSearchResults,
      songSearchResults: songSearchResults
    }).render().$el);

    var $rootEl = $('#content');
    Capstone.appRouter = new Capstone.Routers.AppRouter({
      $rootEl: $rootEl,
      userSearchResults: userSearchResults,
      songSearchResults: songSearchResults
    });

    //this model represents the song most recently added to the queue. Not a collection b/c I want to allow duplicates of the same song on the queue
    Capstone.queueSong = new Capstone.Models.Song();

    var playback = new Capstone.Views.Playback({
      model: new Capstone.Models.Song()
    });
    $('#playback').html(playback.$el);
    playback.render();

    // overkill?
    Capstone.playSong = playback.playSong.bind(playback);
    Capstone.pauseSong = playback.pauseSong.bind(playback);

    // So that models representing the same song are the same model. Array so that two can both be in w/ same id
    Capstone.onPageSongs = [];

    //setup modal search view
    var view = new Capstone.Views.ModalSearchView();
    $("body").append(view.$el);
    view.$el.css("display", "none");
    Capstone.modalSearchView = view;

    Backbone.history.start();
  }
};
