class Api::SongsController < ApplicationController
  def show
    @song = Song.find(params[:id])
  end

  def create
    @song = Song.new(song_params)
    @song.user_id = current_user.id
    @song.length = 68 #temp
    @song.create_digs_array #temp

    @song.artist_name = nil if @song.artist_name == current_user.username
    if @song.save
      render :show
    else
      render @songs.errors.full_messages, status: 422
    end
  end

  private

  def song_params
    params.require(:song).permit(:name, :artist_name, :file_path)
  end
end
