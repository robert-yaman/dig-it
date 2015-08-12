class Api::UsersController < ApplicationController
  def current
    @user = current_user
    render :show
  end

  def index
    if params[:query]
      @users = User.search_by(params[:query])
    else
      @users = User.all
    end
  end

  def show
    @user = User.find(params[:id])
  end
end
