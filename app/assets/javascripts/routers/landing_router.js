Capstone.Routers.LandingRouter = Backbone.Router.extend({
  routes: {
    "" : "landing"
  },

  landing: function () {
    var signInView = new Capstone.Views.SignIn();
    var signUpView = new Capstone.Views.SignUp();
    $("#sign-in").html(signInView.render().$el);
    $("#sign-up").html(signUpView.render().$el);
  }
});
