class AddDigsGivenAndRecieved < ActiveRecord::Migration
  def change
    add_column :users, :digs_given, :integer, default: 0
    add_column :users, :digs_received, :integer, default: 0
  end
end
