Capstone.runFirstTutorial = function () {
  if (Capstone.tutorialMode !== 1) return;
  Capstone.tutorialMode++;
  $(".tutorial-helper").remove();
  var helper = $("<div class=tutorial-helper></div>");
  helper.html("Welcome to Dig-it! Click play for the hottest song on Dig-it, Bury Us Alive.");
  helper.css("top", "124px").css("left", "-218px");
  $(".leaderboard").append(helper);

  var circle = $("<div class='helper-circle'>");
  $(".leaderboard").append(circle);

  function circleGlow() {
    $(".leaderboard .helper-circle").animate({ opacity: 0.2 }, 600, 'linear')
                     .animate({ opacity: 1 }, 600, 'linear', circleGlow);

    // .animate({
    //   borderTopColor: "#4CBB17",
    //   borderLeftColor: "#4CBB17",
    //   borderRightColor: "#4CBB17",
    //   borderBottomColor: "#4CBB17"
    // }, 500, "linear").animate({
    //   borderTopColor: "#FEFCD7",
    //   borderLeftColor: "#FEFCD7",
    //   borderRightColor: "#FEFCD7",
    //   borderBottomColor: "#FEFCD7"
    // }, 500, "linear", circleGlow);
  }

  $(circleGlow);

  // setTimeout(function () {
  //   $(".leaderboard .helper-circle").addClass("glowing");
  // }, 0);
  //
  // $(".leaderboard .helper-circle").on("transitionend", function(){
  //   alert("transitionend")
  //   if ($(".leaderboard .helper-circle").hasClass("glowing")) {
  //     $(".leaderboard .helper-circle").removeClass("glowing");
  //   } else {
  //     $(".leaderboard .helper-circle").addClass("glowing");
  //   }
  // });
};

Capstone.runSecondTutorial = function () {
  if (Capstone.tutorialMode !== 2) return;
  Capstone.tutorialMode++;
  $(".helper-circle").remove();
  $(".tutorial-helper").remove();
  var helper = $("<div class=tutorial-helper></div>");
  helper.html("The hottest parts of the playback bar are also the hottest parts of the song. Find the best part of the song and skip to it!");
  helper.css("top", "-44px").css("left", "44%");
  $("#playback .navbar-fixed-bottom").append(helper);
};

Capstone.runThirdTutorial = function () {
  if (Capstone.tutorialMode !== 3) return;
  Capstone.tutorialMode++;
  $(".tutorial-helper").remove();
  var helper = $("<div class=tutorial-helper></div>");
  helper.html("What did you think of that part? If you hear a spot in a song that you dig, hit the DIG button. Don't be afraid to really mash that button if you're feeling it!");
  helper.css("top", "-100px").css("right", "3%");
  $("#playback .navbar-fixed-bottom").append(helper);
};

Capstone.runFourthTutorial = function () {
  if (Capstone.tutorialMode !== 4) return;
  Capstone.tutorialMode++;
  $(".tutorial-helper").remove();
  var helper = $("<div class=tutorial-helper></div>");
  helper.html("Awesome! Now lets check out your profile.");
  helper.css("top", "60px").css("right", "3%").css("text-shadow", "none");

  var arrow = $("<div class='helper-arrow glyphicon glyphicon-arrow-right'></div>");

  $("#app-navbar .navbar-fixed-top").append(helper);
};

Capstone.runFifthTutorial = function () {
  if (Capstone.tutorialMode !== 5) return;
  Capstone.tutorialMode++;
  $(".tutorial-helper").remove();
  var helper = $("<div class=tutorial-helper></div>");
  helper.html("Here are the songs you've uploaded so far. Try adding them both to the queue using the dropdowns on the right.");
  helper.css("top", "52px").css("right", "11%");
  $(".current-user-feed").append(helper);
};

Capstone.runSixthTutorial = function () {
  if (Capstone.tutorialMode !== 6) return;
  Capstone.tutorialMode++;
  $(".tutorial-helper").remove();
  var helper = $("<div class=tutorial-helper></div>");
  helper.html("Click the <span class='glyphicon glyphicon-menu-up'></span> to view and edit the queue.");
  helper.css("top", "37px").css("right", "7%");
  $("#playback .navbar-fixed-bottom").append(helper);
};

Capstone.runSeventhTutorial = function () {
  if (Capstone.tutorialMode !== 7) return;
  Capstone.tutorialMode = false;
  $(".tutorial-helper").remove();
  var helper = $("<div class=tutorial-helper></div>");
  helper.html("Finally, you can upload new songs with this button. That's all we've got -- have fun exploring Dig-it!");
  helper.css("top", "60px").css("right", "8%").css("text-shadow", "none");
  $("#app-navbar .navbar-fixed-top").append(helper);
  setTimeout(function() {
    Capstone.tutorialMode = false;
    $(".tutorial-helper").remove();
  }, 4000);
};
