class User < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  def self.recent(offset)
    order(created_at: :desc).includes(:top_three_songs).limit(5).offset(5 * offset)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    (user.is_password?(password) ? user : nil) if user
  end

  # def self.followed_by(current_user_id)
  #   ##just call current_user.followered.users you idiot!
  #
  #   #any particular order?
  #
  #   joins('INNER JOIN followings ON users.id = followings.followed_user_id')
  #   .joins('INNER JOIN  users cu ON  cu.id = followings.follower_id')
  #   .where("cu.id = #{current_user_id}").includes(:top_three_songs)
  #   #actually, I know that the user is following all these ppl anyways...
  # end

  def self.six_followed_by(current_user_id)
    ## just use followed_users!!!
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
    order(digs_received: :desc).limit(3).includes(:top_three_songs)
  end

  def self.search_by_query_string(string, offset)
    includes(:top_three_songs).where("LOWER(username) LIKE '%#{string.downcase}%'")
    .limit(10).offset(10 * offset)
  end

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  attr_reader :password

  after_initialize :ensure_session_token

  has_many :songs, dependent: :destroy, inverse_of: :user
  has_many :followings_as_object, class_name: :Following, foreign_key: :followed_user_id
  has_many :followings_as_subject, class_name: :Following, foreign_key: :follower_id
  has_many :followers, through: :followings_as_object, source: :follower
  has_many :followed_users, through: :followings_as_subject, source: :followed_user

  has_many :top_three_songs, -> { order(total_digs: :desc).limit(3) },
            class_name: :Song, foreign_key: :user_id

  def followed_users_hash
    # to avoid N+1 queries when fetching list of users
    if @fuh
      @fuh
    else
      @fuh = {}
      followings_as_subject.each do |following|
        @fuh[following.followed_user_id] = following
      end
      @fuh
    end
  end

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
    top_three_songs.first
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
