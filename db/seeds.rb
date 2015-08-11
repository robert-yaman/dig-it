# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create!(username: "robert", email: "digitrobert@gmail.com", password: "robertdigit")
u2 = User.create!(username: "michaela", email: "digitmichaela@gmail.com", password: "michaeladigit")
u3 = User.create!(username: "linda", email: "digitlinda@gmail.com", password: "lindadigit123")
u4 = User.create!(username: "bill", email: "digitbill@gmail.com", password: "billdigit")

u1.songs.create!(name: "Happy Song", length: 1, file_path: "aeraeraser")
u1.songs.create!(name: "Sad Song", length: 100, file_path: "aeraeraser")
u1.songs.create!(name: "Love Song", length: 67, file_path: "aeraeraser")

u2.songs.create!(name: "Silly Song", length: 500, file_path: "aeraeraser")
