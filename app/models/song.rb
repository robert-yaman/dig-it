class Song < ActiveRecord::Base
  def self.search_by_query_string(string)
    where("LOWER(name) LIKE '%#{string.downcase}%' OR LOWER(artist_name) LIKE '%#{string.downcase}%'")
  end

  validates :user, :length, :file_path, presence: true
  validate :digs_array_length_equals_length
  # after_initialize :create_digs_array

  belongs_to :user

  def create_digs_array
    length.times { digs << 0} if digs == []
  end

  def digs_array_length_equals_length
    if digs != [] && digs.length != length
      errors[:digs] << "array needs to have one element per second"
    end
  end
end
