Capstone.Models.Song = Backbone.Model.extend({
  urlRoot: 'api/songs',

  length: function () {
    var minutes = Math.floor(this.get("length") / 60);
    var seconds = this.get("length") - (minutes * 60);
    return minutes + ":" + seconds;
  },

  user: function() {
    if (!this.collection) {
      return null;
    }

    return this.collection.user;
  },

  userName: function() {
    return this.user() && this.user().escape("name");
  }
});
