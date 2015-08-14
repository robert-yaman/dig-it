class Song < ActiveRecord::Base
  def self.recent
    order(created_at: :desc)[0..4]
  end

  def self.top #EW
    Song.all.sort_by do |song|
      song.digs.sum
    end.reverse![0..4]
  end

  def self.search_by_query_string(string)
    where("LOWER(name) LIKE '%#{string.downcase}%' OR LOWER(artist_name) LIKE '%#{string.downcase}%'")
  end

  validates :user, :file_path, presence: true
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

  def username
    user.username
  end
end
