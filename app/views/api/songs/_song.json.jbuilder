json.extract! song, :id, :user_id,  :name, :length, :artist_name, :digs, :file_path, :updated_at

if with_username
  json.extract! song, :username
end
