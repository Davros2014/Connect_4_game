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

// VICTORY MUSIC
const victoryMusic = new Audio("assets/victoryMusic.mp3");

// INTRO MUSIC
$(".start").click(e => introMusic.pause(e));

// RESET GAME

$(".playAgain").click(e => location.reload(e));

// $(".playAgain").on("click", function() {
//     location.reload();
// });

// START GAME

$(".start").click(() => $(".introPage").addClass("animated"));

// $(".start").on("click", function() {
//     $(".introPage").addClass("animated");
// });

// VARIABLES
var allSlots = $(".slot"),
    player1 = "player1",
    player2 = "player2",
    currPlayer = player1;

(function() {
    // var scores = {};

    // increases credit amount
    // $("#creditAmount").text(localStorage.getItem("creditAmount"));
    // $(".credit").on("click", function() {
    //     localStorage.setItem("creditAmount", 0);
    //     $("#creditAmount").text(localStorage.getItem("creditAmount"));
    // });

    // LOCAL STORAGE SCORES

    // retrieves player scores from local storage
    $("#p1Score").text(localStorage.getItem(player1));
    $("#p2Score").text(localStorage.getItem(player2));

    // var currPlayer = "player1";
    $("#resetScore").on("click", function(e) {
        reset.play(e);
        localStorage.setItem(player1, 0);
        localStorage.setItem(player2, 0);
        $("#p1Score").text(localStorage.getItem(player1));
        $("#p2Score").text(localStorage.getItem(player2));
    });

    // all the winning combination in a 6x7 board - not dynamic but hey, it works;
    $(".column").on("click", function(e) {
        // adds a chip of the current player to the board on click
        var slotsInColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
                console.log("slotsInColumn", slotsInColumn);

                slotsInColumn
                    .eq(i)
                    .addClass(currPlayer)
                    .addClass("fall");
                break;
            }
        }
        if (i === -1) {
            return;
        }

        // checks if current slot has class of current player > if count = 4, current player wins
        function victoryCheck(slots) {
            var count = 0;
            console.log("slots", slots);
            for (var i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currPlayer)) {
                    count++;
                    slots.eq(i).hasClass(currPlayer);
                    console.log(
                        "Slot here is slots.eq(i).hasClass(currPlayer) ",
                        slots.eq(i).hasClass(currPlayer),
                        currPlayer
                    );

                    console.log("victoryCheck: The value is ", count);
                    if (count === 3) {
                        // Random message
                        animateText();
                    }
                    if (count === 4) {
                        console.log(
                            "victoryCheck count === 4: The value is ",
                            count
                        );
                        //  COUNT 4 > CURRENT PLAYER WINS
                        // if (slots.eq(i).hasClass(currPlayer)) {
                        //     slots.eq(i).addClass("victoryDancing");
                        console.log("VICTORY COLOR");
                        // }
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        // refactor this

        // function diagonalVictoryCheck(diagonalSlots) {
        //     var count = 0;
        //     for (var j = 0; j < diagonalSlots.length; j++) {
        //         if (allSlots.eq(diagonalSlots[j][0]).hasClass(currPlayer)) {
        //             console.log("DIAGONAL ONE", count);
        //             count++;
        //             if (allSlots.eq(diagonalSlots[j][1]).hasClass(currPlayer)) {
        //                 console.log("DIAGONAL TWO", count);
        //                 count++;
        //                 if (
        //                     allSlots
        //                         .eq(diagonalSlots[j][2])
        //                         .hasClass(currPlayer)
        //                 ) {
        //                     if (count === 3) {
        //                         animateText();
        //                     } else {
        //                         console.log("DIAGONAL THREE", count);
        //                         count++;
        //                     }
        //                     if (
        //                         allSlots
        //                             .eq(diagonalSlots[j][3])
        //                             .hasClass(currPlayer)
        //                     ) {
        //                         console.log("DIAGONAL FOUR", count);
        //                         count++;
        //                         console.log("that a big fat 4");
        //                         if (count == 4) {
        //                             //  COUNT GETS TO 4 CURRENT PLAYER WINS
        //                             return true;
        //                         }
        //                     }
        //                 }
        //             }
        //         } else {
        //             count = 0;
        //         }
        //     }
        // }

        function diagonalVictoryCheck(diagonalSlots) {
            var resetCount = count === 0;
            var count = 0;
            for (var j = 0; j < diagonalSlots.length; j++) {
                if (allSlots.eq(diagonalSlots[j][0]).hasClass(currPlayer)) {
                    count++;
                    console.log("diagonalSlots COUNT1", count);
                    if (allSlots.eq(diagonalSlots[j][1]).hasClass(currPlayer)) {
                        count++;
                        console.log("diagonalSlots COUNT2", count);

                        if (
                            allSlots
                                .eq(diagonalSlots[j][2])
                                .hasClass(currPlayer)
                        ) {
                            count++;
                            // console.log("diagonalSlots COUNT3", count);
                            count === 3 ? animateText() : null;
                            console.log("Count = 3, animate text", count);
                            if (
                                allSlots
                                    .eq(diagonalSlots[j][3])
                                    .hasClass(currPlayer)
                            ) {
                                count++;
                                console.log("you win");

                                return true;
                            } else {
                                resetCount;
                            }
                        } else {
                            resetCount;
                        }
                    } else {
                        resetCount;
                    }
                } else {
                    resetCount;
                }
            }
        }
        // CHECKS 4 VICTORY
        if (victoryCheck(slotsInColumn)) {
            andTheWinnerIs(currPlayer);
            return;
        } else if (victoryCheck($(".column").find(".row" + i))) {
            andTheWinnerIs(currPlayer);
            return;
        } else if (diagonalVictoryCheck(diagonalSlots)) {
            andTheWinnerIs(currPlayer);
            return;
        }

        function andTheWinnerIs() {
            const getLocal = localStorage.getItem(currPlayer);
            if (getLocal) {
                localStorage.setItem(currPlayer, Number(getLocal) + 1);
                $("#p1Score").text(localStorage.getItem("player1"));
                $("#p2Score").text(localStorage.getItem("player2"));
            } else {
                localStorage.setItem(currPlayer, 1);
            }
            // gameMusic.pause();

            setTimeout(() => {
                victoryMusic.play();
                $(".winModal").addClass("appear");
                $(".winMessage")
                    .html("YOU WIN " + "</br>" + "</br>" + currPlayer)
                    .show();
            }, 600);
        }
        switchPlayers(); // CHANGE PLAYERS - PROCESS BEGINS AGAIN
    });

    // if player gets 3 in row > random message displays to the player
    function animateText() {
        var x = Math.floor(Math.random() * 11 + 1);
        console.log("random number", x);
        var supportText = [
            "Wunderbar",
            `Go, ${currPlayer}`,
            "Super",
            "Great",
            "Amazing",
            "You rock",
            "Crazy",
            "Insane",
            `Wow, ${currPlayer}`,
            "Outstanding",
            "Unbelievable",
            `wtf, ${currPlayer}`
        ];
        $(".gogoText")
            .html(supportText[x])
            .addClass("animate");
        finish.play();
        setTimeout(() => {
            $(".gogoText").removeClass("animate");
        }, 1000);
    }
    // Switches to the current player's go
    function switchPlayers() {
        currPlayer === player1
            ? (currPlayer = player2)
            : (currPlayer = player1);
        playerTurn();
    }
    // Shows the current player > highlighted top right
    function playerTurn() {
        currPlayer === player1
            ? $(".p2").addClass("lowOpacity") &&
              $(".p1").removeClass("lowOpacity")
            : $(".p1").addClass("lowOpacity") &&
              $(".p2").removeClass("lowOpacity");
    }
})();
