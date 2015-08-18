Capstone.Views.CurrentUserInfo = Backbone.CompositeView.extend({
  template: JST["current_user_info"],

  events: {
    "click .tell-us" : "displayAboutMeForm"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);

    this.addSubview(".most-popular-song .song-item", new Capstone.Views.UserListItemSongItem({model: this.model.mostPopularSong() }));
    this.addSubview(".about-me", new Capstone.Views.AboutMe({model: this.model}));
  },

  displayAboutMeForm: function (event) {
    event.preventDefault();
    var form = new Capstone.Views.AboutMeForm({model :this.model});
    this.removeModelSubview(".about-me", this.model)
    this.$(".tell-us").remove();
    this.addSubview(".about-me", form)
    this.$(".about-me-textarea").focus()
    this.$(".about-me-textarea").one("blur", function () {
      console.log("submit")
      this.$(".about-me-form").submit()
      this.displayNormalAboutMe()
    }.bind(this))
  },

  displayNormalAboutMe: function () {
    this.removeModelSubview(".about-me", this.model)
    this.addSubview(".about-me", new Capstone.Views.AboutMe({model: this.model}));
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
