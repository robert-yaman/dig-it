json.extract! user, :id, :username, :md5

if followed_users_hash && followed_users_hash[user.id]
  json.follow_by_current_user followed_users_hash[user.id]
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
      json.partial! 'api/songs/song', song: song, with_username: false
    end
  end
end

if extra_profile_info
  json.extract! user, :about_me, :joined, :most_popular_song, :karma
end
