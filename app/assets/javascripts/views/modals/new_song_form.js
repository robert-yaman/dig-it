Capstone.Views.Modals.NewSongForm = Backbone.CompositeView.extend({
  template: JST["new_song_form_modal"],
  className: "modal",

  initialize: function () {
    var song = new Capstone.Models.Song();
    var form = new Capstone.Views.SongForm({model: song});
    this.addSubview(".form", form);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.$(".form").leanModal();
    return this;
  }
});
