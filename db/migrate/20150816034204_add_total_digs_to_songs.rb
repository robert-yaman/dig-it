class AddTotalDigsToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :total_digs, :integer, default: 0
  end
end
