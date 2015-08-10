class Song < ActiveRecord::Base
  validates :user, :length, :file_path, presence: true
  validate :digs_array_length_equals_length

  belongs_to :user

  def digs_array_length_equals_length
    if digs && digs.length != length
      errors[:digs] << "array needs to have one element per second"
    end
  end
end
