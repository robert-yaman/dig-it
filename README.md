# <<

[Heroku link][heroku]

[heroku]: #

## Minimum Viable Product
<< is a clone of Soundcloud. Users can:

- [ ] Create accounts
- [ ] Create sessions (log in)
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

### Phase 1: User Authentication, Blog Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create blogs using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-five]

### Bonus Features/Stretch Goals (TBD)
- [ ] "Heatmap" playback
  * [ ] During playback, users can "like" the portion (~1 second) of the song they are currently listening to
    - [ ] When a user likes, there will be some instand feedback, e.g. the playback will light up
  * [ ] The database will keep track of the number of likes each portion has
  * [ ] When playback begins, the database will create an array of colors. Each color will correspond to one portion of the song and represent how "hot" that portion is (e.g. proportion of its own likes to the total number of likes for the song)
    - an alternative to this would be to have a jQuery heatmap plugin (third party options exist) that generates the heatmap from the data directly in the browser
    - http://www.patrick-wied.at/static/heatmapjs/
  * [ ] The browser will convert this array into a solid "heatmap". Users will then be able to see the "hottest" parts of the son
  * [ ] As the song plays, a pointer will move along the heatmap (probably JQuery plugin)
  * [ ] Users will be able to skip to different parts of the song
- [ ] Include Hot and Most Popular songs on the feed view


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
