# Dig-It

[Heroku link][heroku]

[heroku]: #

## Minimum Viable Product
Dig-It is a clone of Soundcloud. Users can:

- [X] Create accounts
- [X] Create sessions (log in)
- [ ] Upload songs
- [ ] Visit other users' pages and view their songs
- [ ] Listen to their own songs and other users' songs
- [ ] Search songs and users by name

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Set up basic models (~1 day) (done)
I will implement user authentication in Rails based on the practices learned at
App Academy. I will also set up the database, and the necessary models in both Rails and Backbone. Given the time, I will also set up the basic structure of the sign up/sign page. (Note: I will be using gravatar, and I will therefore store users' emails in the database)

### Phase 2: Set up page skeletons and navigation between pages (~3 days)
I will set up the necessary Backbone views "from the bottom up". That is, I will first create the non-composite views, such as the user-list-item, then build the views which will contain those, and so on until all the basic views are constructed. I will not focus on styling at all at this point. By the end of this page, users should be able to click through all of the main pages of the website as they would for the finished product.

### Phase 3: Set up Feed and Search (~1 day)
In this phase, I will create methods in the Rails song and user models to compute which songs and users should be displayed when. I will then hook this into the front end so that the feed on the landing page is functional, and so that users can search by songs and username/artists. (Note: the song-search will match based on either name or artist, and the user search will match only based on username).

### Phase 4: Storing/Playing/Uploading music files (~1 day)
In this phase, I will figure out the best way to store music files. Once this is understood, I will figure out the best way to fetch these files from the database so they can be played, and the best way for users to upload these files. By the end of this phase, all the basic functionality for the MVP should be in place, but there will still be no styling.

### Phase 5: Heatmap Playback (~3 days)
I will first figure how to create a Heatmap from and array of numbers which represents "digs" over time (see jQuery plugin below). This heatmap should be one-dimensional in the sense that any pixel should be the same color as the pixels above and below it, but not necessarily to the left or right. I will then work this heatmap into the playback bar. The implementation of this will most likely use canvas, but will ultimately depend on the how the heatmap itself is implemented. I will implement a cursor that will point to the current point in the song, most likely with jQuery. Next, I will implement a "dig" button that will allow users to modify the array of digs stored in the database. (I will only sync the array with the db after the song is stopped, so as to avoid a high number of queries). Finally, I will let users click on a section of the playback to jump to that section of the song.

### Phase 6: CSS/Catchup/Extra Features
I will probably use a built in bootstrap style and customize from there.

[Details][phase-one]

### Bonus Features/Stretch Goals (TBD)
- [ ] "Heatmap" playback (this is not necessary for the MVP, but I would like to implement it if at all possible)
  * [ ] During playback, users can "dig" the portion (~1 second) of the song they are currently listening to (akin to "liking")
    - [ ] When a user digs, there will be some instant feedback, e.g. the playback will light up
  * [ ] The database will keep track of the number of digs each portion has
  * [ ] When playback begins, the database will createan array of colors. Each color will correspond to one portion of the song and represent how "hot" that portion is (e.g. proportion of its own likes to the total number of likes for the song)
    - an alternative to this would be to have a jQuery heatmap plugin (third party options exist) that generates the heatmap from the data directly in the browser
    - http://www.patrick-wied.at/static/heatmapjs/
  * [ ] The browser will convert this array into a solid "heatmap". Users will then be able to see the "hottest" parts of the son
  * [ ] As the song plays, a pointer will move along the heatmap (probably JQuery plugin)
  * [ ] Users will be able to skip to different parts of the song
- [ ] Include Hot and Most Popular songs on the feed view
- [ ] Users can add tags to songs and search by tag


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
