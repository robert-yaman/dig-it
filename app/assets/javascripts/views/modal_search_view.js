Capstone.Views.ModalSearchView = Backbone.CompositeView.extend({
  template: JST["modal_search_view"],
  className: "col-xs-6 col-xs-offset-3",
  id: "modal-search-view",

  configSongList: function () {
    if (this.subviews(".modal-search-list").first()) {
      this.removeSubview(".modal-search-list", this.subviews(".modal-search-list").first());
    }
    var view = new Capstone.Views.SongList({collection: this.collection});
    this.addSubview(".modal-search-list", view);
  },

  configUserList: function () {
    if (this.subviews(".modal-search-list").first()) {
      this.removeSubview(".modal-search-list", this.subviews(".modal-search-list").first());
    }
    var view = new Capstone.Views.UserList({collection: this.collection});
    this.addSubview(".modal-search-list", view);
  },

  render: function () {
    //TODO make this a conditioal when incorporating songs
    var content = this.template({users: this.collection});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
