json.array! @users do |user|
  json.partial! 'user', user: user, with_all_songs: false, with_top_three_songs: true, extra_profile_info: false, followed_users_hash: @followed_users_hash
end
