// Basic Variables needed across the page

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// When a button is clicked

$(".btn").on("click", function () {

  // Push the colour pressed into userClickedPattern array

  var userChosenColour = this.getAttribute("id");
  userClickedPattern.push(userChosenColour);

  // Check if everything is right or not

  checkAnswer();

  // Play the sound of the particular colour

  playSound(userChosenColour);

  // Add animation to that particular colour button

  animatePress(userChosenColour);

});

// When any key is pressed

$(document).keypress(function () {

  // Start the game

  nextSequence();

});

// Function to start the game by making a pattern of colours

function nextSequence() {

  // Increment the level

  level++;

  // Change the text of the heading to the according level

  $("h1").text("Level " + level);

  // Create a random number and pick the random colour from the array

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  // Push the picked the colour to the gamePattern array

  gamePattern.push(randomChosenColour);

  // Flash the picked colour's button

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play the sound of the particular colour

  playSound(randomChosenColour);

}

// Function to play the sound

function playSound(colourPressed) {

  // Pick the particular sound

  switch (colourPressed) {

    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;

    case "wrong":
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      break;

    default:
      console.log(colourPressed);
      break;
  }

}

// Function to add the animation to the button

function animatePress(currentColour) {

  // Add the class pressed to particular colour button and after 100ms remove it

  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {

    $("#" + currentColour).removeClass("pressed");

  }, 100);

}

// Function to check if everything is right or not

function checkAnswer() {

  // At first, check whether the pressed colour is present at the right position in gamePattern array or not

  if (gamePattern[userClickedPattern.length - 1] == userClickedPattern[userClickedPattern.length - 1]) {

    console.log("success");

    // If the length of both arrays are equal that means the level is completed and everything is right

    if (gamePattern.length == userClickedPattern.length) {

      setTimeout(function () {

        // Move to next level

        userClickedPattern = [];

        nextSequence();

      }, 1000);

    }

  }
  else {

    console.log("loss");

    // The user input is wrong. Play the wrong sound

    playSound("wrong");

    // Display that the game is over

    $("h1").text("Game Over, Press Any Key to Restart");

    // Add the class game-over to the body and after 100ms remove it

    $("body").addClass("game-over");

    setTimeout(function () {

      $("body").removeClass("game-over");

    }, 100);

    // Reset the value of userClickedPattern, gamePattern and level

    startOver();

  }

}

// Funtion to reset the value of userClickedPattern, gamePattern and level

function startOver() {

  userClickedPattern = [];
  gamePattern = [];
  level = 0;

}
