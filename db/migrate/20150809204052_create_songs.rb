class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :user_id, null: false, index: true
      t.string :name, null: false
      t.integer :length, null: false
      t.string :artist_name
      t.integer :digs, array: true, default: []
      t.string :file_path, null: false

      t.timestamps null: false
    end
  end
end
