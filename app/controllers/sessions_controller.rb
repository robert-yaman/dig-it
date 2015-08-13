class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      @user = User.new(username: params[:user][:username])
      render json: @user, status: 422 #check this
    end
  end

  def destroy
    logout!
    render "logged out"
  end

  def new
  end
end
