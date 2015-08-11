# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create!(username: "robert", email: "robert@robert.com", password: "robert")
u2 = User.create!(username: "michaela", email: "michaela@michaela.com", password: "michaela")
u3 = User.create!(username: "linda", email: "linda@linda.com", password: "linda")
u4 = User.create!(username: "bill", email: "bill@bill.com", password: "bill")

u1.songs.create!(name: "Happy Song", length: 3, digs: [0,0,0], file_path: "aeraeraser")
u1.songs.create!(name: "Sad Song", length: 3, digs: [0,3,43], file_path: "aeraeraser")
u1.songs.create!(name: "Love Song", length: 10, digs: [0,0,0,0,0,0,0,0,0,0], file_path: "aeraeraser")

u2.songs.create!(name: "Silly Song", length: 10, digs: [0,0,0,0,0,0,0,0,0,0], file_path: "aeraeraser")
