class Song < ActiveRecord::Base
  def self.by_user(user_id)
    where(user_id: user_id).includes(:user)
  end

  def self.following(current_user_id) #any particular order?
    songs_by_users_followed = find_by_sql(<<-SQL)
      SELECT *
      FROM songs s
      WHERE s.user_id IN (
        SELECT beingfollowed.id
        FROM users beingfollowed
          INNER JOIN followings f ON beingfollowed.id = f.followed_user_id
          INNER JOIN users current ON current.id = f.follower_id
        WHERE current.id = #{current_user_id}
      )
    SQL
    ActiveRecord::Associations::Preloader.new.preload(songs_by_users_followed, :user)
    #this is temporary
    songs_by_users_followed.sample(5)
  end

  def self.recent(which_user = false)
    recents = order(created_at: :desc).includes(:user).limit(5)
    which_user ? recents.where(user_id: which_user.to_i) : recents
  end

  def self.top(which_user = false)
    tops = order(total_digs: :desc).includes(:user).limit(5)
    which_user ? tops.where(user_id: which_user.to_i) : tops
  end

  def self.search_by_query_string(string)
    where("LOWER(name) LIKE '%#{string.downcase}%' OR LOWER(artist_name) LIKE '%#{string.downcase}%'").includes(:user)
  end

  validates :name, :user, :file_path, presence: true
  validate :digs_array_length_equals_length
  after_initialize :create_digs_array
  before_validation :add_length_if_not_there

  belongs_to :user, inverse_of: :songs

  def add_length_if_not_there
    #indicates that length was not stored correctly on patch request
    self.length = -1 unless length
  end

  def create_digs_array
    length.times { digs << 0} if digs == [] && length
  end

  def digs_array_length_equals_length
    if digs != [] && digs.length != length
      errors[:digs] << "array needs to have one element per second"
    end
  end

  def heatmap_data(canvas_width)
    radius = canvas_width.to_f / length
    highest_dig_count = 1
    response_data = []

    digs.each_with_index do |dig, i|
      response_data << {x: i * radius, y: 0, value: dig} if dig > 0
      highest_dig_count = dig if dig > highest_dig_count
    end

    {data: response_data, max: highest_dig_count, min: 0, radius: radius}
  end

  def username
    user.username
  end
end
