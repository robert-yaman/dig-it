json.extract! user, :id, :username, :md5

if with_songs
  json.songs do
    json.array! user.songs do |song|
      json.partial! 'api/songs/song', song: song
    end
  end
end
