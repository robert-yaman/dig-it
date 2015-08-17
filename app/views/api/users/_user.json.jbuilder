json.extract! user, :id, :username, :md5

json.followed_by_current_user !user.followers.where(id: current_user.id).empty?

if with_songs
  json.songs do
    json.array! user.songs do |song|
      json.partial! 'api/songs/song', song: song
    end
  end
end

if extra_profile_info
  json.extract! user, :about_me, :joined, :most_popular_song, :karma
end
