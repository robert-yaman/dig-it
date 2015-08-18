json.extract! user, :id, :username, :md5

follow_by_current_user = user.followings_as_object.where(follower_id: current_user.id)

if !follow_by_current_user.empty?
  json.follow_by_current_user follow_by_current_user.first
end

if with_all_songs
  json.songs do
    json.array! user.songs do |song|
      json.partial! 'api/songs/song', song: song
    end
  end
end

if with_top_three_songs
  json.songs do
    json.array! user.top_three_songs do |song|
      json.partial! 'api/songs/song', song: song
    end
  end
end

if extra_profile_info
  json.extract! user, :about_me, :joined, :most_popular_song, :karma
end
