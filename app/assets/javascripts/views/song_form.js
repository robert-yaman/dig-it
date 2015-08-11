Capstone.Views.SongForm = Backbone.View.extend({
  template: JST["song_form"],

  events: {
    "submit form" : "submit"
  },

  //should I give this a user model that represents current user?
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  submit: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    this.model.save(data, {
      success: function() {
        alert("success!")
      }.bind(this)
    });
  }
});
