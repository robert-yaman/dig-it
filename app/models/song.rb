class Song < ActiveRecord::Base
  def self.recent
    order(created_at: :desc).includes(:user).limit(5)
  end

  def self.top #EW
    Song.includes(:user).all.sort_by do |song|
      song.digs.sum
    end.reverse![0..4]
  end

  def self.search_by_query_string(string)
    where("LOWER(name) LIKE '%#{string.downcase}%' OR LOWER(artist_name) LIKE '%#{string.downcase}%'").includes(:user)
  end

  validates :name, :user, :file_path, presence: true
  validate :digs_array_length_equals_length
  after_initialize :create_digs_array
  before_validation :add_length_if_not_there

  belongs_to :user

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
