class Api::UsersController < ApplicationController
  def current
    @user = current_user
    render :show
  end

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
    @user = User.find(params[:id])
  end
end
