window.Capstone = {
  Models: {},
  Collections: {},
  Views: {Modals: {}},
  Routers: {},
  initialize: function(options) {
    window.Capstone.currentUser = new Capstone.Models.CurrentUser();
    window.Capstone.currentUser.fetch();

    var $rootEl = $('#content');
    new Capstone.Routers.AppRouter({$rootEl: $rootEl});

    var playback = new Capstone.Views.Playback({model: new Capstone.Models.Song()});
    $('#playback').html(playback.$el);
    playback.render();

    Capstone.playSong = playback.playSong.bind(playback)

    Backbone.history.start();
  }
};
