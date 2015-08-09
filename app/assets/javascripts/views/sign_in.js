//deprecated
Capstone.Views.SignIn = Backbone.View.extend({
  template: JST["sign_in"],

  events: {
    "submit form" : "signIn"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  signIn: function(event) {
    event.preventDefault();
    var data = $(event.currentTarget).serializeJSON();
    new Capstone.Models.Session().save(data.user, {
      success: function () {
      },
      error: function () {
        alert("errors occured");
      }
    });
  }
});
