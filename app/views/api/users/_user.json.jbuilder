json.extract! user, :username, :email

if with_songs
  json.songs do
    json.array! user.songs do |song|
      json.partial! 'songs/song', song: song
    end
  end
end
