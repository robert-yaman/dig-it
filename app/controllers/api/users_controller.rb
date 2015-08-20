class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: @user, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    if params[:query]
      @users = User.search_by_query_string(params[:query])
    elsif params[:new_user]
      @users = User.recent
    elsif params[:leaders]
      @users = User.leaders
    elsif params[:followed_by]
      @users = User.followed_by(params[:followed_by])
      #we know that all users are followed by current user, so no need to query db
      render :followed_by
    elsif params[:six_followed_by]
      @users = User.six_followed_by(params[:six_followed_by])
      #only need name and md5
      render :six_followed_by
    else
      @users = User.all
    end
  end

  def show
    if params[:current]
      @user = current_user
    else
      @user = User.includes(:songs, :followings_as_object).find(params[:id])
    end

    if params[:extra_profile_info]
      render :profile
    else
      render :show
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :about_me)
  end
end
