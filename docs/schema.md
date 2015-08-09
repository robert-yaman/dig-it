# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
email           | string    | not null
password_digest | string    | not null
session_token   | string    | not null, indexed

## songs
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key, indexed
user_id       | integer   | not null, foreign key (references user who uploaded), indexed
length (secs) | integer   | not null
artist_name   | string    | (will be stored only if artist different from uploader)
digs          | array     |
file_path     | string    | not null (unsure of how to implement this)
