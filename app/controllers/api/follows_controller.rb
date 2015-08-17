class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.create(follow_params)
    @follow.follower = current_user

    if @follow.save
      render json: @follow, status: 200
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy
    redner json: @follow, status: 200
  end

  private

  def follow_params
    params.require(:follow).permit(:followed_user_id)
  end
end
