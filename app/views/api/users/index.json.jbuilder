json.array! @users do |user|
  json.partial! 'user', user: user, with_songs: true, extra_profile_info: false
end
