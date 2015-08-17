class CreateFollowings < ActiveRecord::Migration
  def change
    create_table :followings do |t|
      t.integer :follower_id, null: false, index: true
      t.integer :followed_user_id, null: false, index: true
      t.timestamps null: false
    end

    add_index :followings, [:follower_id, :followed_user_id], unique: true
  end
end
