class Api::FollowsController < ApplicationController
  def create
    @follow = Following.create(follow_params)
    @follow.follower = current_user

    if @follow.save
      render json: @follow, status: 200
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    @follow = Following.find(params[:id])
    @follow.destroy
    render json: @follow, status: 200
  end

  private

  def follow_params
    params.require(:follow).permit(:followed_user_id)
  end
end
