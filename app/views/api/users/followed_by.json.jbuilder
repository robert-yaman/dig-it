json.array! @users do |user|
  json.extract! user, :id, :username, :md5
  json.follow_by_current_user true
  json.songs do
    json.array! user.top_three_songs do |song|
      json.partial! 'api/songs/song', song: song
    end
  end
end
