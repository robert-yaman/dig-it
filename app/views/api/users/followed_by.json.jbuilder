json.array! @users do |user|
  json.extract! user, :id, :username, :md5
end
