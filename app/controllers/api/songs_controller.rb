class Api::SongsController < ApplicationController
  def show
    @song = Song.find(params[:id])
  end

  def create
    @song = Song.new(song_params)
    @song.user_id = current_user.id
    @song.length = 3 #temp
    @song.digs = [0,0,0] #temp

    if @song.save
      render :show
    else
      render @songs.errors.full_messages
    end
  end

  private

  def song_params
    params.require(:song).permit(:name, :artist_name, :file_path)
  end
end
