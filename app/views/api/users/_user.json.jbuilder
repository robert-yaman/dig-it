json.extract! user, :id, :username, :email

if with_songs
  json.songs do
    json.array! user.songs do |song|
      json.partial! 'api/songs/song', song: song
    end
  end
end
