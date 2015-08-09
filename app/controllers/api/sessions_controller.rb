class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(params[:session][:username], #session b/c sending by saving a new Session
                                     params[:session][:password])
    if @user
      login!(@user)
      redirect_to root_url
    else
      @user = User.new(username: params[:session][:username])
      #error messages?
      render json: @user, status: 422 #check this
    end
  end

  def destroy
    logout!
    redirect_to landing_url
  end
end
