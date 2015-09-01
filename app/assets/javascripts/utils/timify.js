Capstone.timify = function (secs) {
  var minutes = Math.floor(secs / 60);
  var seconds = secs - (minutes * 60);
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};
