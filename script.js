// create board - make dynamic later
const connectBoard = document.querySelector(".board");
const buildBoard = (rows, columns) => {
    let board = [];
    let column = [];
    for (let i = 1; i <= columns; i++) {
        let row = [];
        for (let j = 0; j <= rows - 1; j++) {
            row.push(`<div class="slot row${[j]}">
                            <div class="hole"></div>
                        </div>`);
        }
        column = `<div class="column col${[i]}">${row.join("")}</div>`;
        board.push(column);
        column = "";
    }
    const boardOutputToHTML = board.join("");
    connectBoard.innerHTML = boardOutputToHTML;
};
buildBoard(6, 7);

const introMusic = new Audio("assets/introMusic.mp3");
$(document).ready(function() {
    introMusic.play();
});

// sound effects
const gameMusic = new Audio("assets/gameMusic.mp3");
$(".start").click(e => gameMusic.play(e));

// const startSound = new Audio("assets/start_GG.wav");
// $(".start").click(e => startSound.play(e));

const dropSound = new Audio("assets/drop.wav");
$(".slot").click(e => dropSound.play(e));

const finish = new Audio("assets/finish_him.mp3");
const reset = new Audio("assets/reset.mp3");

const victoryMusic = new Audio("assets/victoryMusic.mp3");

$(".start").click(e => introMusic.pause(e));
$(".playAgain").click(e => location.reload(e));
$(".start").click(() => $(".introPage").addClass("animated"));

let allSlots = $(".slot"),
    player1 = "player1",
    player2 = "player2",
    currPlayer = player1;

(function() {
    //scores
    $("#p1Score").text(localStorage.getItem(player1));
    $("#p2Score").text(localStorage.getItem(player2));
    $("#resetScore").on("click", function(e) {
        reset.play(e);
        localStorage.setItem(player1, 0);
        localStorage.setItem(player2, 0);
        $("#p1Score").text(localStorage.getItem(player1));
        $("#p2Score").text(localStorage.getItem(player2));
    });

    // all the winning combination in a 6x7 board - not dynamic but works;
    $(".column").on("click", function(e) {
        // adds a chip of the current player to the board on click
        var slotsInColumn = $(e.currentTarget).find(".slot");
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("player1") &&
                !slotsInColumn.eq(i).hasClass("player2")
            ) {
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
        function victoryCheck(slots) {
            var count = 0;
            for (let i = 0; i < slots.length; i++) {
                if (slots.eq(i).hasClass(currPlayer)) {
                    count++;
                    slots.eq(i).hasClass(currPlayer);
                    if (count === 3) {
                        animateText();
                    }
                    if (count === 4) {
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }
        function diagonalVictoryCheck(diagonalSlots) {
            var count = 0;
            for (var j = 0; j < diagonalSlots.length; j++) {
                if (allSlots.eq(diagonalSlots[j][0]).hasClass(currPlayer)) {
                    count++;
                    if (allSlots.eq(diagonalSlots[j][1]).hasClass(currPlayer)) {
                        count++;
                        if (
                            allSlots
                                .eq(diagonalSlots[j][2])
                                .hasClass(currPlayer)
                        ) {
                            count++;
                            count === 3 ? animateText() : null;
                            if (
                                allSlots
                                    .eq(diagonalSlots[j][3])
                                    .hasClass(currPlayer)
                            ) {
                                count++;
                                // console.log("you win");
                                return true;
                            } else {
                                count = 0;
                            }
                        } else {
                            count = 0;
                        }
                    } else {
                        count = 0;
                    }
                } else {
                    count = 0;
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
            gameMusic.pause();
            setTimeout(() => {
                victoryMusic.play();
                $(".winModal").addClass("appear");
                $(".winMessage")
                    .html("YOU WIN " + "</br>" + "</br>" + currPlayer)
                    .show();
            }, 1000);
        }
        switchPlayers();
    });

    // if player gets 3 in row > random message displays to the player
    function animateText() {
        finish.play();
        var x = Math.floor(Math.random() * 11 + 1);
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

let diagonalSlots = [
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
