class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to root_url
    else
      redirect_to new_session_url
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
