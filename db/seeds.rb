# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

beethoven = User.create(username: "ludwig_vanB_123", email: "ludwig-vanB-123@SharedMailbox.org",
                        password: "IAmBeethoven",
                        about_me: "Born in Bonn, then the capital of the
                        Electorate of Cologne and part of the Holy Roman Empire,
                        I displayed my musical talents at an early age and was
                        taught by me father Johann van Beethoven and by Christian
                        Gottlob Neefe. During my first 22 years in Bonn, I intended
                        to study with Wolfgang Amadeus Mozart and befriended Joseph Haydn.
                        I moved to Vienna in 1792 and began studying with Haydn,
                        quickly gaining a reputation as a virtuoso pianist. I
                        lived in Vienna until my death. In about 1800, my hearing
                        began to deteriorate, and by the last decade of my life, I was almost totally deaf.
                        I gave up conducting and performing in public but
                        continued to compose; many of my most admired works come from this period.")

ligeti = User.create(username: "ligeti-splitz", email: "ligeti-splitz-123@SharedMailbox.org",
                password: "IAmLigeti",
                about_me: "I was born in 1923 at Dicsőszentmárton, which was renamed
                Târnăveni in 1945, in Transylvania to a Hungarian Jewish family.
                I recalls that my first exposure to languages other than Hungarian
                came one day while listening to a conversation among the
                Romanian-speaking town police. Before that I hadn't known that
                other languages existed. I moved to Cluj (Kolozsvár) with my family
              when aged six and I was not to return to the town of my birth until the 1990s.")

sarah = User.create(username: "sarah_vonVaughan", email: "sarah-sarah_vonVaughan-123@SharedMailbox.org",
                password: "IAmSarah",
                about_me: "My father, Asbury \"Jake\" Vaughan, was a carpenter by
                trade and played guitar and piano. My mother, Ada Vaughan, was a
                laundress and sang in the church choir. They had migrated to Newark
                from Virginia during the First World War. I was their only
                biological child, although in the 1960s they adopted Donna, the
                child of a woman who traveled on the road with me.")

bird = User.create(username: "bird", email: "bird-bird-bird@SharedMailbox.org",
                password: "IAmCharlie",
                about_me: "I. was born in Kansas City, Kansas, and raised in Kansas
                City, Missouri, the only child of Adelaide \"Addie\" (Bailey)
                and Charles Parker. I attended Lincoln High School in September
                1934, but withdrew in December 1935, just before joining the local
                musicians' union.")

lady_gaga = User.create(username: "gAgA", email: "lady-gaga-123@SharedMailbox.org",
                password: "IAmGaga",
                about_me: "I rose to prominence with mu debut album The Fame (2008),
                a critical and commercial success which produced global chart-topping
                singles such as \"Just Dance\" and \"Poker Face\". A follow-up EP,
                The Fame Monster (2009), was met with a similar reception and
                released the successful singles \"Bad Romance\", \"Telephone\",
                and \"Alejandro\".")

buble = User.create(username: "bubbly_bublé", email: "bubbly-buble-123@SharedMailbox.org",
                password: "IAmBuble",
                about_me: "My first album reached the top ten in Canada and the UK.
                I found a worldwide audience with my 2005 album It's Time, and my
                2007 album Call Me Irresponsible which reached number one on the
                Canadian Albums Chart, the UK Albums Chart, the U.S. Billboard
                200 albums chart, the Australian ARIA Albums Chart and several
                European charts.")


drake = User.create(username: "dragon", email: "dragon-dragon-123@SharedMailbox.org",
                    password: "IAmDrake",
                    about_me: "I have sold over 5 million albums worldwide. My
                    work has earned me a Grammy Award, three Juno Awards, six BET
                    Awards, and set several significant Billboard records. With
                    twelve number-one singles, I have more than any other artist
                    on Billboard's Hot Rap Songs chart. With ten number-one singles,
                    I also has more than any other rapper on Billboard‍ '​s Hot
                    R&B/Hip-Hop Songs chart, passing Jay-Z in August 2012. I am
                    one of two artists (the other being 50 Cent) that has
                    simultaneously occupied the chart's top three positions.")

elvis = User.create(username: "the_king", email: "the-king-123@SharedMailbox.org",
                    password: "IAmElvis",
                    about_me: "I was born on January 8, 1935, in Tupelo, Mississippi,
                    the son of Gladys Love and Vernon Elvis Presley in the two-room
                    shotgun house built by Vernon's father in preparation for
                    the child's birth. Jesse Garon Presley, my identical twin
                    brother, was delivered stillborn 35 minutes before him.
                    As an only child, I became close to both parents and formed
                    an especially close bond with his mother. My family attended
                    an Assembly of God church, where I found my initial musical
                    inspiration.")

thom = User.create(username: "yorkshire_thomming", email: "yorkshire-thomming-123@SharedMailbox.org",
                    password: "IAmThom",
                    about_me: "I received my first guitar when I was seven; my
                    earliest musical inspiration was guitarist Brian May of Queen.
                    At 10, I made my own guitar, inspired by May's Red Special.
                    By 11, I had joined my first band and written my first song.
                    In Oxford I attended the boys' public school Abingdon, where
                    I met Ed O'Brien, Phil Selway, and brothers Colin and Jonny
                    Greenwood and formed On a Friday, named for the only day we
                    were allowed to rehearse. I said: \"School was bearable for
                    me because the music department was separate from the rest
                    of the school. It had pianos in tiny booths, and I used to
                    spend a lot of time hanging around there after school.\"
                    After leaving school, I took a gap year, during which I worked
                    in a few jobs and was involved in a car accident that influenced
                    the lyrics of some of my songs including the Bends B-side
                    \"Killer Cars\" and \"Airbag\" from OK Computer.")

ravi = User.create(username: "ravi_ssss_123", email: "ravi-ssss-123@SharedMailbox.org",
                    password: "IAmRavi",
                    about_me: "I was born to a Bengali family in Varanasi, India,
                    and spent my youth touring India and Europe with the dance
                    group of my brother Uday Shankar. I gave up dancing in 1938
                    to study sitar playing under court musician Allauddin Khan.
                    After finishing my studies in 1944, I worked as a composer,
                    creating the music for the Apu Trilogy by Satyajit Ray,
                    and was music director of All India Radio, New Delhi,
                    from 1949 to 1956.")

led = User.create(username: "lead_zeppelin", email: "lead-zeppelin-123@SharedMailbox.org",
                    password: "IAmLed",
                    about_me: "We are widely considered one of the most successful,
                    innovative, and influential rock groups in history. We are
                    one of the best-selling music artists in the history of audio
                    recording; various sources estimate our record sales at 200
                    to 300 million units worldwide. With RIAA-certified sales of
                    111.5 million units, we are the second-best-selling band in
                    the United States. Each of our nine studio albums placed in
                     the top 10 of the Billboard album chart and six reached the
                     number-one spot. Rolling Stone magazine described us as
                     \"the heaviest band of all time\", \"the biggest band of the
                      '70s\",[4] and \"unquestionably one of the most enduring
                      bands in rock history\". We were inducted into the Rock and
                      Roll Hall of Fame in 1995; the museum's biography of the
                      band states that they were \"as influential\" during the
                      1970s as the Beatles were during the 1960s.")

sufjan = User.create(username: "-(s_s)-", email: "sufjan-stevens-123@SharedMailbox.org",
                    password: "IAmSufjan",
                    about_me: "I have released albums of varying styles, from the
                    electronica of Enjoy Your Rabbit and the lo-fi folk of Seven
                    Swans to the symphonic instrumentation of Illinois and
                    Christmas-themed Songs for Christmas. I make use of a variety
                    of instruments, often playing many of them myself on the same
                    recording, and write music in various time signatures.
                    Though I have repeatedly stated an intent to separate my beliefs
                    from my music, I also freely draw from the Bible and Christian
                    tradition.")


beethoven.songs.create!(artist_name: "Testament", length: 327, name: "True American Hate", file_path: "https://www.filepicker.io/api/file/O9epzCYyRltxSOj2dZvj")
beethoven.songs.create!(artist_name: "Pictureplane", length: 200, name: "Goth Star", file_path: "https://www.filepicker.io/api/file/BlcxNm1TH6lIiMZt51fA")
beethoven.songs.create!(artist_name: "Chrome Sprks", length: 261, name: "All There Is (Feat. Steffaloo)", file_path: "https://www.filepicker.io/api/file/2Zy5ABLSMixgDE5tlDN4")
beethoven.songs.create!(length: 170, name: "Goliath", file_path: "https://www.filepicker.io/api/file/XFyR4DomTVKafy9ewTBE")
beethoven.songs.create!(artist_name: "Waxahatchee", length: 150, name: "Grass Stain", file_path: "https://www.filepicker.io/api/file/A1p6AAIbQ12kaQlJ0cqT")
beethoven.songs.create!(artist_name: "Graveyard", length: 167, name: "Endless Night", file_path: "https://www.filepicker.io/api/file/RDtWF7U8SXO0NLjmFrAB")

ligeti.songs.create!(artist_name: "Poets of the Fall", length: 285, name: "Maybe Tomorrow is a Better Day", file_path: "https://www.filepicker.io/api/file/ZBnxVPXaSVKKcwqeh7EC")
ligeti.songs.create!(artist_name: "Lifetheory", length: 138, name: "Daisy", file_path: "https://www.filepicker.io/api/file/rjldl7xSdS8HJP0zfBww")
ligeti.songs.create!(artist_name: "Tin Man", length: 185, name: "Future Islands", file_path: "https://www.filepicker.io/api/file/PyhyQwlLTeOBbZK5WWBQ")
ligeti.songs.create!(length: 206, name: "Pú ert sólin", file_path: "https://www.filepicker.io/api/file/y8Zgv4lRuI6Dn0Vil2wU")
ligeti.songs.create!(artist_name: "Mac DeMarco", length: 191, name: "Rock and Roll Night Club", file_path: "https://www.filepicker.io/api/file/kgHhbCLrQxeHLZ13F9On")
ligeti.songs.create!(artist_name: "Blackbird Blackbird", length: 144, name: "Pure", file_path: "https://www.filepicker.io/api/file/m70XfUbUTgWXifabIZyR")
ligeti.songs.create!(artist_name: "Nils Frahm", length: 189, name: "You", file_path: "https://www.filepicker.io/api/file/75uKl0qyR2qU5vCLalr8")
ligeti.songs.create!(length: 117, name: "Cyanide Sisters", file_path: "https://www.filepicker.io/api/file/HrLq3aS0TN0FgBgQgljF")

sarah.songs.create!(name: "2080", length: 324, file_path: "https://www.filepicker.io/api/file/nodac3D0QsOswyMFvCyk")
sarah.songs.create!(artist_name: "Gardens & Villa", name: "Black Hills", length: 285, file_path: "https://www.filepicker.io/api/file/PZKgiWsCRs2i07FafsWa")
sarah.songs.create!(name: "Your First Light My Eventide", artist_name: "The Echelon Effect", length: 311, file_path: "https://www.filepicker.io/api/file/6PvrfjsKTcGV1bSQqJ4N")
sarah.songs.create!(name: "Baby Missiles", artist_name: "The War on Drugs", length: 214, file_path: "https://www.filepicker.io/api/file/iZP43GoGQpu2cY9tVFdM")
sarah.songs.create!(name: "Lionheart", artist_name: "Bury Tomorrow", length: 220, file_path: "https://www.filepicker.io/api/file/yLb3zAl6RaSzf07iZuDQ")
sarah.songs.create!(artist_name: "Motorama", name: "Alps", length: 253, file_path: "https://www.filepicker.io/api/file/WOQ1iNBR6mBZAq6aLU93")
sarah.songs.create!(name: "Catching Fireflies", artist_name: "The Soul's Release", length: 289, file_path: "https://www.filepicker.io/api/file/sVxepQqRiF5b7iCj6oCQ")

sufjan.songs.create!(name: "Too Much", length: 404, file_path: "https://www.filepicker.io/api/file/nWSxTgT3TjWywjEldoIp")
sufjan.songs.create!(name: "I Walked", length: 301, file_path: "https://www.filepicker.io/api/file/tv4wESzzQoqH2Bxw8FLg")

bird.songs.create!(name: "Mlèdek", artist_name: "Russian Circles", length: 187, file_path: "https://www.filepicker.io/api/file/hvrqxNkSFykwzugePi7p")
bird.songs.create!(name: "Re", artist_name: "Nils Frahm", length: 231, file_path: "https://www.filepicker.io/api/file/0pBAgHwuQuSh00SDS3sA")
bird.songs.create!(artist_name: "Nils Frahm", name: "Do", length: 186, file_path: "https://www.filepicker.io/api/file/9yU4qqnSRhipJ8ksAarg")
bird.songs.create!(name: "Thirteen Thirtyfive", artist_name: "Dillon", length: 224, file_path: "https://www.filepicker.io/api/file/l9w5XsdGRlegcK38GeiF")
bird.songs.create!(name: "Little League", artist_name: "Cap'n Jazz", length: 237, file_path: "https://www.filepicker.io/api/file/f2Ir9dmESrmk9NBpCDf4")
bird.songs.create!(artist_name: "Future Islands", name: "Before the Bridge", length: 256, file_path: "https://www.filepicker.io/api/file/2oROa3QRCmoIFUwZfkbn")

lady_gaga.songs.create!(artist_name: "Evenings", length: 175, name: "Babe", file_path: "https://www.filepicker.io/api/file/lr3naXk7RFawEGQp4fDC")
lady_gaga.songs.create!(artist_name: "Jens Lekman", length: 228, name: "An Argument With Myself", file_path: "https://www.filepicker.io/api/file/5U2At7jTaRMh52dCDZCA")
lady_gaga.songs.create!(artist_name: "General Fuzz", length: 363, name: "Comfort Zone", file_path: "https://www.filepicker.io/api/file/IQZqmcP2RlG7GJQ5EQ4i")
lady_gaga.songs.create!(length: 195, name: "Said And Done", file_path: "https://www.filepicker.io/api/file/P0EjhGP9ThCz6QYqqNmC")
lady_gaga.songs.create!(length: 248, name: "Sunrise", file_path: "https://www.filepicker.io/api/file/ZG58pjcoR44VyjCVX3Fw")

buble.songs.create!(artist_name: "Museum", length: 263, name: "The Law", file_path: "https://www.filepicker.io/api/file/t75GzsnaQFadhzPIyXZW")
buble.songs.create!(artist_name: "The Glitch Mob", length: 220, name: "Warrior Concerto", file_path: "https://www.filepicker.io/api/file/PdlbvTzAQCwZFTplfiSY")
buble.songs.create!(artist_name: "Alkaline Trio", length: 160, name: "Clavicle", file_path: "https://www.filepicker.io/api/file/GNPCZxg6Tf7IQaiIHAuA")
buble.songs.create!(length: 191, name: "Bury Us Alive", file_path: "https://www.filepicker.io/api/file/a6Ep16pZS32kX1FXgswc")

drake.songs.create!(name: "Mlèdek", artist_name: "Russian Circles", length: 187, file_path: "https://www.filepicker.io/api/file/hvrqxNkSFykwzugePi7p")
drake.songs.create!(name: "Wind in Her Hair", artist_name: "Motorama", length: 288, file_path: "https://www.filepicker.io/api/file/h2uBio0URUWZNzmVZ3Lu")
drake.songs.create!(artist_name: "Sonata Arctica", name: "I Have A Right", length: 289, file_path: "https://www.filepicker.io/api/file/txo367VR72JHT4OlmS11")

elvis.songs.create!(artist_name: "Gem Club", length: 260, name: "Twins", file_path: "https://www.filepicker.io/api/file/B4P58xzmSSK8946POFY2")
elvis.songs.create!(artist_name: "The Glitch Mob", length: 220, name: "Warrior Concerto", file_path: "https://www.filepicker.io/api/file/PdlbvTzAQCwZFTplfiSY")

led.songs.create!(name: "The Fever (Aye Aye)", length: 187, file_path: "https://www.filepicker.io/api/file/N8If2Ko5TD2gx10iDmea")
led.songs.create!(name: "I've Seen Footage", length: 202, file_path: "https://www.filepicker.io/api/file/PHXQCL4OTuR5rLc1rskT")
led.songs.create!(name: "Get Got", length: 171, file_path: "https://www.filepicker.io/api/file/dXkOr1w0TCmkW7JazFJS")

ravi.songs.create!(name: "Zonnestraal", artist_name: "De Hofnar", length: 257, file_path: "https://www.filepicker.io/api/file/9np5MpBQlyod6DOgGzFi")
ravi.songs.create!(name: "Emily", length: 130, artist_name: "Gaba Kulka", file_path: "https://www.filepicker.io/api/file/xuKVsP81Ti2u3uGyGNPh")
ravi.songs.create!(name: "If I had a Reason in My Mind", length: 225, file_path: "https://www.filepicker.io/api/file/Ac6QIg33QiZ0j0Q9rjBg")
ravi.songs.create!(name: "El Guarda Forestal", artist_name: "Pony Bravo", length: 350, file_path: "https://www.filepicker.io/api/file/giMHdqCjQpRIMLbZRMHc")
ravi.songs.create!(name: "Graveyard", length: 226, artist_name: "Trailer Bride", file_path: "https://www.filepicker.io/api/file/O4OV4ZyOR3WeqTMs2ARt")
ravi.songs.create!(name: "Ghost Town", length: 165, file_path: "https://www.filepicker.io/api/file/MnQEeITeGBkY2MQzjcCg")

thom.songs.create!(name: "Odyseey", length: 277, file_path: "https://www.filepicker.io/api/file/oUKsUCnTq6NWhf24sDGw")
thom.songs.create!(name: "Summe of Haze", length: 291, file_path: "https://www.filepicker.io/api/file/ptnsNufsQTSgGtcME8Lv")

((User.count - 1) * 6).times do
  following = Following.new(follower_id: (2..User.count).to_a.sample, followed_user_id: (1..User.count).to_a.sample)
  until following.save
    following = Following.new(follower_id: (2..User.count).to_a.sample, followed_user_id: (1..User.count).to_a.sample)
  end
end

(1..7).each do |num|
  beethoven.followings_as_subject.create!(followed_user_id: num + 2)
end
