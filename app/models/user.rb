class User < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  def self.recent
    order(created_at: :desc).includes(:songs, :followings_as_object).limit(5)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    (user.is_password?(password) ? user : nil) if user
  end

  def self.followed_by(current_user_id)
    #any particular order?


    joins('INNER JOIN followings ON users.id = followings.followed_user_id')
    .joins('INNER JOIN  users cu ON  cu.id = followings.follower_id')
    .where("cu.id = #{current_user_id}").includes(:followings_as_object)
    #actually, I know that the user is following all these ppl anyways...


    #
    # users = find_by_sql(<<-SQL)
    #   SELECT fu.*
    #   FROM  users fu
    #     INNER JOIN followings ON fu.id = followings.followed_user_id
    #     INNER JOIN  users cu ON  cu.id = followings.follower_id
    #   WHERE cu.id = #{current_user_id}
    # SQL
    # ActiveRecord::Associations::Preloader.new.preload(users, :followings_as_object)
    # users
  end

  def self.six_followed_by(current_user_id)
    find_by_sql(<<-SQL)
      SELECT fu.*
      FROM  users fu
        INNER JOIN followings ON fu.id = followings.followed_user_id
        INNER JOIN  users cu ON  cu.id = followings.follower_id
      WHERE cu.id = #{current_user_id}
      LIMIT 6
    SQL
  end

  def self.leaders
    order(digs_received: :desc).limit(3)
  end

  def self.search_by_query_string(string)
    includes(:followings_as_object).where("LOWER(username) LIKE '%#{string.downcase}%'")
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

  def top_three_songs
    songs.order(total_digs: :desc).limit(3)
  end

  private

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end
end
