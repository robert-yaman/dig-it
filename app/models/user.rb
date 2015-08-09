class User < ActiveRecord::Base
  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    (user.is_password?(passowrd) ? user : nil) if user
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
