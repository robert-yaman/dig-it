# Dig-It

[Live](http://www.dig-it.xyz/)

##About

Dig-it is a non-commercial music sharing app inspired by SoundCloud. Users can  “dig” songs in real time (akin to “liking”). The playback bar on the page is then displayed as a heatmap that shows which parts of the song have received the highest number of overall likes. This features is designed to allow users to easily skip to the best part of each song.

##Features

- Playback bar built from scratch
  - Playback bar displayed as a heatmap
  - Users can "dig" the song in real time
  - Users can adjust the volume
  - Users can skip sections by clicking on on the playback bar
  - Pointers move as the song is playing to indicate the current part of the song
- A leaderboard which shows the top three users (by total number of digs) and each of their top three songs
- A custom implementation of infinite-pagination for feeds and search results
  - Batches of content are prefetched to improve perceived load time.
- Users can dynamically search their songs or followed users from their profile page.
- In the backend, custom associations to minimize the number of queries
  - Data sent to the front end only when necessary
- A queue in which users can control what plays next
  - Songs can be deleted from the queue and moved around via drag-and-drop
- Users can follow other users and stay up to date with their new uploads
- A feed on the home page which shows recent uploads, top songs, and songs uploaded by users that the current user is following
- Guest login, and a tutorial that demos the main features  
- Each user has a "karma" values which grows with the proportion of digs-given to digs-received

##Tools

- Backbone.js
- Ruby on Rails
- PostgreSQL
- Boostrap
- [https://www.filepicker.com/](Filepicker)
- [http://www.patrick-wied.at/static/heatmapjs/](heatmap.js)
- [https://en.gravatar.com/](Gravatar)
- [http://leanmodal.finelysliced.com.au/](leanModal)
