class Api::SongsController < ApplicationController
  def create
    @song = Song.new(song_params)
    @song.user_id = current_user.id

    @song.artist_name = nil if @song.artist_name == current_user.username
    if @song.save
      render :show
    else
      render @songs.errors.full_messages, status: 422
    end
  end

  def index
    if params[:query]
      @songs = Song.search_by_query_string(params[:query])
    elsif params[:recent]
      @songs = Song.recent
    elsif params[:top]
      @songs = Song.top
    else
      @songs = Song.all
    end
  end

  def update
    @song = Song.find(params[:id])

    @song.assign_attributes(song_params)
    @song.digs = params[:song][:digs] || []
    if @song.save
      render :show
    else
      render @songs.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.find(params[:id])

    if params[:canvas_width]
      render json: @song.heatmap_data(params[:canvas_width])
    end
  end

  private

  def song_params
    params.require(:song).permit(:name, :artist_name, :file_path, :length, :digs)
  end
end
