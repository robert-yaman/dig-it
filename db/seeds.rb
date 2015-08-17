# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create!(username: "robert", email: "digitrobert@gmail.com", password: "robertdigit")
u2 = User.create!(username: "michaela", email: "digitmichaela@gmail.com", password: "michaeladigit", about_me: "Hey everyone! I'm michaela and I'm an inspiring indie artist who plays the ukelele and the washboard. Check out my song Summe of Haze, its my favorite! I definitely did not misspell \"Summer\".")
u3 = User.create!(username: "linda", email: "digitlinda@gmail.com", password: "lindadigit123")
u4 = User.create!(username: "bill", email: "digitbill@gmail.com", password: "billdigit", about_me: "Hi there, I am Robert's dad Bill. I'm haven't uploaded any music myself, but I'm happy just digging what I dig.")
u5 = User.create!(username: "Death Grips", email: "dg@lalala.com", password: "deathgripsdigit")
guest = User.create(username: "ludwig_vanB_123", email: "ludwig_vanB_123@gmail.com", password: "IAmBeethoven", about_me: "Guten Tag everyone.")

u5.songs.create!(name: "The Fever (Aye Aye)", length: 187, file_path: "https://www.filepicker.io/api/file/N8If2Ko5TD2gx10iDmea")
u5.songs.create!(name: "I've Seen Footage", length: 202, file_path: "https://www.filepicker.io/api/file/PHXQCL4OTuR5rLc1rskT")
u5.songs.create!(name: "Get Got", length: 171, file_path: "https://www.filepicker.io/api/file/dXkOr1w0TCmkW7JazFJS")

u1.songs.create!(name: "Zonnestraal", artist_name: "De Hofnar", length: 257, file_path: "https://www.filepicker.io/api/file/9np5MpBQlyod6DOgGzFi")
u1.songs.create!(name: "Emily", length: 130, artist_name: "Gaba Kulka", file_path: "https://www.filepicker.io/api/file/xuKVsP81Ti2u3uGyGNPh")
u1.songs.create!(name: "If I had a Reason in My Mind", length: 225, file_path: "https://www.filepicker.io/api/file/Ac6QIg33QiZ0j0Q9rjBg")
u1.songs.create!(name: "El Guarda Forestal", artist_name: "Pony Bravo", length: 350, file_path: "https://www.filepicker.io/api/file/giMHdqCjQpRIMLbZRMHc")
u1.songs.create!(name: "Graveyard", length: 226, artist_name: "Trailer Bride", file_path: "https://www.filepicker.io/api/file/O4OV4ZyOR3WeqTMs2ARt")
u1.songs.create!(name: "Ghost Town", length: 165, file_path: "https://www.filepicker.io/api/file/MnQEeITeGBkY2MQzjcCg")

u2.songs.create!(name: "Odyseey", length: 277, file_path: "https://www.filepicker.io/api/file/oUKsUCnTq6NWhf24sDGw")
u2.songs.create!(name: "Summe of Haze", length: 291, file_path: "https://www.filepicker.io/api/file/ptnsNufsQTSgGtcME8Lv")
