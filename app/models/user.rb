
class User < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  def self.recent
    order(created_at: :desc).includes(:songs, :followers).limit(5)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    (user.is_password?(password) ? user : nil) if user
  end

  def self.leaders
    order(digs_received: :desc).includes(:songs, :followers).limit(3)
  end

  def self.search_by_query_string(string)
    where("LOWER(username) LIKE '%#{string.downcase}%'").includes(:songs, :followers)
  end

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  attr_reader :password

  after_initialize :ensure_session_token

  has_many :songs, dependent: :destroy
  has_many :followings_as_object, class_name: :Following, foreign_key: :followed_user_id
  has_many :followings_as_subject, class_name: :Following, foreign_key: :follower_id
  has_many :followers, through: :followings_as_object, source: :follower
  has_many :followed_users, through: :followings_as_subject, source: :followed_user

  def is_password?(attempt)
    BCrypt::Password.new(password_digest).is_password?(attempt)
  end

  def joined
    time_ago_in_words(created_at)
  end

  def karma
    if digs_received == 0 || digs_given == 0
      -1
    else
      digs_given / digs_received
    end
  end

  def md5
    Digest::MD5.hexdigest(email.downcase)
  end

  def most_popular_song
    songs.order(total_digs: :desc).first
  end

  def password=(value)
    @password = value
    self.password_digest = BCrypt::Password.create(value)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    save!
    session_token
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end
end
