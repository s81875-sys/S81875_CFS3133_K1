/* Rock, Paper, Scissors Game */

// Variables to store the game information
let gameStarted = false;

let wins = 0;
let losses = 0;
let draws = 0;

// Array to store the results of every round
let results = [];

let round = 0;


// 1. START GAME FUNCTION
function startGame() {

    // Get the player's name
    let name = document.getElementById("playerName").value;

    // Check whether the name is empty
    if (name.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    // Allow the game to start
    gameStarted = true;

    // Display welcome message
    document.getElementById("welcome").innerHTML =
        "Welcome, " + name + "!";

    // Display the starting date and time
    document.getElementById("startTime").innerHTML =
        "Game started on: " + new Date();

}


// 2. GET COMPUTER CHOICE FUNCTION
function getComputerChoice() {

    // Array containing three choices
    let choices = ["rock", "paper", "scissors"];

    // Generate a random number from 0 to 2
    let randomNumber = Math.floor(Math.random() * 3);

    // Return the computer's choice
    return choices[randomNumber];

}


// 3. PLAY ROUND FUNCTION
function playRound(playerChoice) {

    // Check whether the game has started
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    // Get computer's random choice
    let computerChoice = getComputerChoice();

    // Update the round number
    round++;

    // Display player and computer images
    document.getElementById("playerImg").src =
        playerChoice + ".png";

    document.getElementById("computerImg").src =
        computerChoice + ".png";


    // Determine the result
    let result = "";
    let resultColor = "";

    if (playerChoice === computerChoice) {

        result = "Draw";
        resultColor = "grey";
        draws++;

    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {

        result = "Win";
        resultColor = "green";
        wins++;

    } else {

        result = "Lose";
        resultColor = "red";
        losses++;

    }


    // Display the result and change its colour
    document.getElementById("result").innerHTML =
        "You chose " + playerChoice +
        " | Computer chose " + computerChoice +
        " | Result: " + result;

    document.getElementById("result").style.color =
        resultColor;


    // Store the result in the array
    results.push(result);


    // Update the scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;


    // Add a new row to the history table
    document.getElementById("history").innerHTML +=
        "<tr>" +
        "<td>" + round + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td style='color:" + resultColor + "'>" + result + "</td>" +
        "</tr>";

}


// 4. SHOW SUMMARY FUNCTION
function showSummary() {

    // Check whether the game has started
    if (!gameStarted) {
        alert("Please start the game first.");
        return;
    }

    // Count the number of wins using a for loop
    let totalWins = 0;

    for (let i = 0; i < results.length; i++) {

        if (results[i] === "Win") {
            totalWins++;
        }

    }

    // Calculate total rounds
    let totalRounds = results.length;

    // Calculate winning percentage
    let percentage = 0;

    if (totalRounds > 0) {
        percentage = Math.round(
            (totalWins / totalRounds) * 100
        );
    }

    // Display the game summary
    document.getElementById("summary").innerHTML =
        "You played " + totalRounds +
        " rounds and won " + percentage + "%.";

}


// 5. RESET GAME FUNCTION
function resetGame() {

    // Reset all scores
    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;

    // Empty the results array
    results = [];

    // Stop the game until Start Game is clicked again
    gameStarted = false;

    // Reset the scoreboard
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear the history table except the header row
    document.getElementById("history").innerHTML =
        "<tr>" +
        "<th>Round</th>" +
        "<th>You</th>" +
        "<th>Computer</th>" +
        "<th>Result</th>" +
        "</tr>";

    // Clear the result and summary messages
    document.getElementById("result").innerHTML =
        "Waiting for your first round.";

    document.getElementById("summary").innerHTML = "";

    // Reset the images
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";

    // Reset result colour
    document.getElementById("result").style.color = "grey";

    // Clear welcome message and starting time
    document.getElementById("welcome").innerHTML = "";
    document.getElementById("startTime").innerHTML = "";

    // Clear player's name
    document.getElementById("playerName").value = "";

}
