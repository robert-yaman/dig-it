class User < ActiveRecord::Base
  def self.recent
    order(created_at: :desc).includes(:songs).limit(5)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    (user.is_password?(password) ? user : nil) if user
  end

  def self.leaders
    order(digs_received: :desc).limit(3)
  end

  def self.search_by_query_string(string)
    where("LOWER(username) LIKE '%#{string.downcase}%'").includes(:songs)
  end

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  attr_reader :password

  after_initialize :ensure_session_token

  has_many :songs

  def is_password?(attempt)
    BCrypt::Password.new(password_digest).is_password?(attempt)
  end

  def md5
    Digest::MD5.hexdigest(email.downcase)
  end

  def password=(value)
    @passowrd = value
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
