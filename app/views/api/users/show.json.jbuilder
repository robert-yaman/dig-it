json.partial! 'user', user: @user, with_all_songs: true, extra_profile_info: false, with_top_three_songs: false
json.follow_by_current_user @user.follows.where(follower_id: current_user.id)
