Capstone.Views.AboutMeForm = Backbone.View.extend({
  template: JST["about_me_form"],

  events: {"submit form" : "submitAboutMe"},

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },

  submitAboutMe: function (event) {
    event.preventDefault();
    this.model.set("about_me", this.$(".about-me-textarea").val());
    this.model.save();
  }
});
