function PlayConnectFour() {
    this.initialized = false;
    var playerOne, playerTwo;
}
PlayConnectFour.prototype = function () {
    $(document).ready(function () {
        g_connectFour.init();
        $("#reloadGame").on('click', function () {
            $(".board").find("* button").css('background-color', 'rgb(242, 242, 242)').removeClass("clicked");
            $(".board button").removeClass("game-over-buttons");
            $(".board").removeClass("game-over-board");
            playerOne = prompt("Player One name (Black Chips)");
            playerTwo = prompt("Player Two name (Red Chips)");
        });
    });

    init = function (playerOne, playerTwo) {
        var table = $('table tr');
        playerOne = prompt("Player One name (Black Chips)");
        var playerOneColor = 'rgb(0,0,0)';
        playerTwo = prompt("Player Two name (Red Chips)");
        var playerTwoColor = 'rgb(237, 45, 73)';

        function switchPlayer(rowIndex, colIndex, color) {
            return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color).addClass("clicked");
        }

        function returnColor(rowIndex, colIndex) {
            return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
        }

        function checkBottom(colIndex) {
            var colorReport = returnColor(5, colIndex);
            for (var row = 5; row >= 0; row--) {
                colorReport = returnColor(row, colIndex);
                if (colorReport === 'rgb(242, 242, 242)') {
                    return row;
                }
            }
        }

        function colorMatchCheck(one, two, three, four) {
            return (one === two && one === three && one === four && one !== 'rgb(242, 242, 242)' && one !== undefined);
        }

        function horizontalWinCheck() {
            for (var row = 0; row < 6; row++) {
                for (var col = 0; col < 4; col++) {
                    if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))) {
                        g_connectFour.reportWin(row, col);
                        return true;
                    } else {
                        continue;
                    }
                }
            }
        }

        function verticalWinCheck() {
            for (var col = 0; col < 7; col++) {
                for (var row = 0; row < 3; row++) {
                    if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))) {
                        g_connectFour.reportWin(row, col);
                        return true;
                    } else {
                        continue;
                    }
                }
            }
        }


        function diagonalWinCheck() {
            for (var col = 0; col < 5; col++) {
                for (var row = 0; row < 7; row++) {
                    if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                        g_connectFour.reportWin(row, col);
                        return true;
                    } else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                        g_connectFour.reportWin(row, col);
                        return true;
                    } else {
                        continue;
                    }
                }
            }
        }

        function gameEnd(currentPlayerName) {
            for (var col = 0; col < 7; col++) {
                for (var row = 0; row < 7; row++) {
                    $('h3').text(currentPlayerName + " has won! Click Reload Game to play again!");
                    $('.board').addClass('game-over-board');
                    $('.board button').addClass('game-over-buttons');
                }
            }
        }

        var currentPlayer = 1;
        var currentPlayerName = playerOne;
        var currentColor = playerOneColor;

        $('.board button').on('click', function () {
            var col = $(this).closest("td").index();
            var bottomAvail = checkBottom(col);
            switchPlayer(bottomAvail, col, currentColor);

            if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
                gameEnd(currentPlayerName);
                if (g_connectFour.reportWin(true)) {
                    $('h3').text(currentPlayerName + " has won! Click Reload Game to play again!");
                }
            } else {
                currentPlayer = currentPlayer * -1;

                if (currentPlayer === 1) {
                    currentPlayerName = playerOne;
                    $('h3').text(currentPlayerName + ": It's your turn, click a column to add your chip");
                    currentColor = playerOneColor;
                } else {
                    currentPlayerName = playerTwo;
                    $('h3').text(currentPlayerName + ": It's your turn, click a column to add your chip.");
                    currentColor = playerTwoColor;
                }
            }
        })
    },

        reportWin = function (rowNum, colNum) {
            return (rowNum, colNum);
        };
    return {
        init: init,
        reportWin: reportWin,
    };

}();

var g_connectFour = new PlayConnectFour();