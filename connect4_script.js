// Connect Four - make an app version of Connect Four.

// In this game players take turns dropping their pieces into one of seven columns that have six rows of slots. The first player to get their pieces into four slots that

// Your game must follow these basic rules.

// The board has six rows and seven columns
// Two players take turns selecting a column to drop their checker into

// When a player wins, a message appears to announce the victory
// After a player wins, it should be possible to reset the game and play again

// ADDED JAZZ - MUSIC ETC

// INTRO MUSIC
const introMusic = new Audio("assets/introMusic.mp3");
$(document).ready(function() {
    introMusic.play();
});

// MAIN MUSIC ON START
const gameMusic = new Audio("assets/gameMusic.mp3");
$(".start").click(e => gameMusic.play(e));

// START SOUND
const startSound = new Audio("assets/start.wav");
$(".start").click(e => startSound.play(e));

// DROP SOUND ON CLICK
const dropSound = new Audio("assets/drop.wav");
$(".slot").click(e => dropSound.play(e));

const finish = new Audio("assets/finish_him.mp3");
const reset = new Audio("assets/reset.mp3");

// RESETS GAME ON END PAGE
$(".playAgain").on("click", function() {
    location.reload();
});

// VICTORY MUSIC
const victoryMusic = new Audio("assets/victoryMusic.mp3");

$(".start").on("click", function() {
    $(".introPage").addClass("animated");
});
$(".start").click(e => introMusic.pause(e));

// GAME FUNCTIONALITY
var allSlots = $(".slot");
var currentPlayer = "player1";

(function() {
    // increases credit amount
    // $("#creditAmount").text(localStorage.getItem("creditAmount"));
    // $("#credit").on("click", function() {
    //     localStorage.setItem("creditAmount", 0);
    //     $("#creditAmount").text(localStorage.getItem("creditAmount"));
    // });

    // retrieves player scores from local storage
    $("#p1Score").text(localStorage.getItem("player1"));
    $("#p2Score").text(localStorage.getItem("player2"));

    // var currentPlayer = "player1";
    $("#resetScore").on("click", function(e) {
        reset.play(e);
        localStorage.setItem("player1", 0);
        localStorage.setItem("player2", 0);
        $("#p1Score").text(localStorage.getItem("player1"));
        $("#p2Score").text(localStorage.getItem("player2"));
    });

    // gameslots ;
    $(".column").on("click", function(e) {
        var diagonalSlots = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [8, 15, 22, 29],
            [2, 9, 16, 23],
            [7, 14, 21, 28],
            [14, 21, 28, 35],
            [6, 13, 20, 27],
            [13, 20, 27, 34],
            [20, 27, 34, 41],
            [12, 19, 26, 33],
            [19, 26, 33, 40],
            [18, 25, 32, 39],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [9, 14, 19, 24],
            [5, 10, 15, 20],
            [10, 15, 20, 25],
            [15, 20, 25, 30],
            [11, 16, 21, 31],
            [16, 21, 26, 31],
            [21, 26, 31, 36],
            [17, 22, 27, 32],
            [22, 27, 32, 37],
            [23, 28, 33, 38]
        ];

        var slotsInColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                slotsInColumn
                    .eq(i)
                    .addClass(currentPlayer)
                    .addClass("fall");
                break;
            }
        }
        if (i == -1) {
            return;
        }
        function victoryCheck(slots) {
            // checks if the current slot has the class of the current player - if count = 4 current player wins
            var count = 0;
            for (var i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currentPlayer)) {
                    count++;
                    console.log("The value is ", count);
                    if (count === 3) {
                        // MAKE RANDOM MESSAGE APPEAR
                        animateText();
                    }
                    if (count == 4) {
                        //  COUNT GETS TO 4 CURRENT PLAYER WINS
                        // if (slots.eq(i).hasClass(currentPlayer)) {
                        //     slots.eq(i).addClass("victoryDancing");
                        //     console.log("VICTORY COLOR");
                        // }
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        // player gets 3 in row >>> radomly generates a number 1-10 and gives a message of encouragement to the player
        function animateText() {
            var x = Math.floor(Math.random() * 10 + 1);
            if (x <= 3) {
                $(".super").addClass("animate");
            } else if (x > 3 && x < 5) {
                $(".wunderbar").addClass("animate");
            } else if (x > 5 && x < 7) {
                $(".yourock").addClass("animate");
            } else $(".amazing").addClass("animate");
            finish.play();
            setTimeout(function() {
                $(".wunderbar").removeClass("animate");
                $(".super").removeClass("animate");
                $(".amazing").removeClass("animate");
                $(".yourock").removeClass("animate");
            }, 1000);
        }
        function diagonalVictoryCheck(diagonalSlots) {
            var count = 0;
            for (var j = 0; j < diagonalSlots.length; j++) {
                if (allSlots.eq(diagonalSlots[j][0]).hasClass(currentPlayer)) {
                    // console.log("DIAGONAL ONE", count);
                    count++;
                    if (
                        allSlots.eq(diagonalSlots[j][1]).hasClass(currentPlayer)
                    ) {
                        // console.log("DIAGONAL TWO", count);
                        count++;
                        if (
                            allSlots
                                .eq(diagonalSlots[j][2])
                                .hasClass(currentPlayer)
                        ) {
                            if (count === 3) {
                                animateText();
                            } else {
                                // console.log("DIAGONAL THREE", count);
                                count++;
                            }
                            if (
                                allSlots
                                    .eq(diagonalSlots[j][3])
                                    .hasClass(currentPlayer)
                            ) {
                                // console.log("DIAGONAL FOUR", count);
                                count++;
                                if (count == 4) {
                                    //  COUNT GETS TO 4 CURRENT PLAYER WINS
                                    return true;
                                }
                            }
                        }
                    }
                } else {
                    count = 0;
                }
            }
        }

        // CHECKS 4 VICTORY
        if (victoryCheck(slotsInColumn)) {
            andTheWinnerIs(currentPlayer);
            return;
        } else if (victoryCheck($(".column").find(".row" + i))) {
            andTheWinnerIs(currentPlayer);
            return;
        } else if (diagonalVictoryCheck(diagonalSlots)) {
            andTheWinnerIs(currentPlayer);
            return;
        }
        function andTheWinnerIs(player) {
            if (localStorage.getItem(currentPlayer)) {
                localStorage.setItem(
                    currentPlayer,
                    Number(localStorage.getItem(currentPlayer)) + 1
                );
                $("#p1Score").text(localStorage.getItem("player1"));
                $("#p2Score").text(localStorage.getItem("player2"));
            } else {
                localStorage.setItem(currentPlayer, 1);
            }
            gameMusic.pause();
            setTimeout(function() {
                victoryMusic.play();
                $(".winModal").addClass("appear");
                console.log("hello,", player, " you big winner");
                // $(".winMessage").append("currentplayer");
                $(".winMessage")
                    .html("YOU WIN " + "</br>" + "</br>" + currentPlayer)
                    .show();
            }, 500);
        }
        switchPlayers(); // CHANGE PLAYERS - PROCESS BEGINS AGAIN
    });
    // switches to the current player's go
    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
            playerTurn();
        } else {
            currentPlayer = "player1";
            playerTurn();
        }
    }
    // shows the current player in the top right of the screen
    function playerTurn() {
        if (currentPlayer == "player1") {
            $(".p2").addClass("lowOpacity");
            $(".p1").removeClass("lowOpacity");
        } else if (currentPlayer == "player2") {
            $(".p1").addClass("lowOpacity");
            $(".p2").removeClass("lowOpacity");
        }
    }
})();
