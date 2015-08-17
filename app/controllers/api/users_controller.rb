class Api::UsersController < ApplicationController
  # def current
  #   @user = current_user
  #   render :show
  # end

  def index
    if params[:query]
      @users = User.search_by_query_string(params[:query])
    elsif params[:new_user]
      @users = User.recent
    elsif params[:leaders]
      @users = User.leaders
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

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: @user, status: 200
    else
      render json: @user, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
