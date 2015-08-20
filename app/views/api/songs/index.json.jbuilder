json.array! @songs do |song|
  json.partial! 'song', song: song, with_username: true
end
