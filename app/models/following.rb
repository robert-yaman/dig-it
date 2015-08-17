class Following < ActiveRecord::Base
  validates :follower, :followed_user, presence: true
  validates :follower_id, uniqueness: { scope: :followed_user_id }
  validate :user_cant_follow_self

  belongs_to :follower, class_name: :User
  belongs_to :followed_user, class_name: :User

  def user_cant_follow_self
    errors[:user] << "can't follow self" if follower_id == followed_user_id
  end
end
