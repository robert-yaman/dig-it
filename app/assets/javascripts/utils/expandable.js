Capstone.Mixins.Expandable = {
  fetchNextCollection: function () {
    this.dataHash.offset++;

    if (this.dataHash.dataType === "song") {
      this.nextCollection = new Capstone.Collections.Songs();
    } else if (this.dataHash.dataType === "user") {
      this.nextCollection = new Capstone.Collections.Users();
    }

    this.nextCollection.fetch({
      data : this.dataHash,
      success: function(response, collection) {
        if (collection.length === 0) { // no more results to display
          this.$(".expand-button").css("display", "none");
        } else {
          this.$(".expand-button").css("display", "block");
        }
      }.bind(this)
    });
  },

  renderNextCollection: function () {
    var newView;
    if (this.dataHash.dataType === "song") {
      newView = new Capstone.Views.SongList({
        collection: this.nextCollection
      });
    } else if (this.dataHash.dataType === "user") {
      newView = new Capstone.Views.UserList({
        collection: this.nextCollection
      });
    }

    this.addSubview('.current-list', newView);
    this.fetchNextCollection();
  }
};
