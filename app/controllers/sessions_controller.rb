class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      login!(@user)
      render json: @user, status: 200
    else
      @user = User.new(username: params[:user][:username])
      render json: @user, status: 422
    end
  end

  def destroy
    logout!
    render json: current_user, status: 200
  end
end
