class Api::SongsController < ApplicationController
  def create
    @song = Song.new(song_params)
    @song.user_id = current_user.id

    #only store artist if different than submitting user
    @song.artist_name = nil if @song.artist_name == current_user.username
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def destroy
    @song = Song.find(params[:id])
    @song.destroy
    render json: @song, status: 200
  end

  def index
    if params[:query]
      @songs = Song.search_by_query_string(params[:query], params[:offset].to_i)
    elsif params[:recent]
      @songs = Song.recent(params[:offset].to_i, params[:which_user])
    elsif params[:top]
      @songs = Song.top(params[:offset].to_i, params[:which_user])
    elsif params[:following]
      @songs = Song.following(current_user.id)
    elsif params[:which_user]
      @songs = Song.by_user(params[:which_user].to_i)
    else
      @songs = Song.all
    end
  end

  def update
    @song = Song.find(params[:id])

    if params[:digs_given]
      #this is inneficient
      num_digs = params[:digs_given]
      current_user.update(digs_given: current_user.digs_given + num_digs)
      receiver = User.find(params[:song][:user_id])
      receiver.update(digs_given: receiver.digs_given + num_digs)
      @song.total_digs += num_digs
    end

    @song.assign_attributes(song_params)
    @song.digs = params[:song][:digs] || []
    if @song.save
      render :show
    else
      render @songs.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.includes(:user).find(params[:id])

    if params[:canvas_width]
      render json: @song.heatmap_data(params[:canvas_width])
    end
  end

  private

  def song_params
    params.require(:song).permit(:name, :artist_name, :file_path, :length, :digs)
  end
end
