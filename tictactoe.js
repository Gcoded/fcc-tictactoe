
var playerMarker = '';
var cpuMarker = '';
var gameStarted = false;
var gameOver = false;
var playerTurn = true;
var cpuTurn = false;
var playerMarkCSS = '';
var cpuMarkCSS = '';
var playerBoxes = [];
var cpuBoxes = [];


$("#startBtn").click(function(event) {
    if (!gameStarted){
        runSetup();
    }
});

function runSetup() {
    gameStarted = true;
    var xButton = $('<button class="marker" id="xButton"></button>').text('X');
    var oButton = $('<button class="marker" id="oButton"></button>').text('O');
    $('#setup').text('Choose your mark: ').append(xButton, oButton)
        .css('visibility', 'visible');

    $(".marker").click(function(event) {
        if (event.target.id === "xButton") {
            playerMarker = 'X';
            playerMarkCSS = 'xMarker';
            cpuMarker = 'O';
            cpuMarkCSS = 'oMarker';
        }
        if (event.target.id === 'oButton') {
            playerMarker = 'O';
            playerMarkCSS = 'oMarker';
            cpuMarker = 'X';
            cpuMarkCSS = 'xMarker';
        }
        $('#setup').text('You have selected '+playerMarker+', lets begin!');
        var timer = setTimeout(function() {
            $('#setup').css('visibility', 'hidden');
        }, 3000);
    });
}

$(".box").click(function(event) {
    if (gameStarted) {
        var boxSelected = '';

        if (playerTurn && !gameOver) {
            boxSelected = event.target.id;
            playerBoxes.push(parseInt(boxSelected.slice(-1)));
            if ($('#'+boxSelected).text() === '') {
                $('#'+boxSelected).addClass(playerMarkCSS).text(playerMarker);
                if (playerBoxes.length > 2) {
                    checkForWinner(playerBoxes, playerMarker);
                }
                playerTurn = !playerTurn;
                cpuTurn = !cpuTurn;
            }
        }
        if (cpuTurn && !gameOver) {
            var cpuMoveTimer = setTimeout(function() {
                boxSelected = cpuMove();
                cpuBoxes.push(parseInt(boxSelected.slice(-1)));
                $('#'+boxSelected).addClass(cpuMarkCSS).text(cpuMarker);
                if (cpuBoxes.length > 2) {
                    checkForWinner(cpuBoxes, cpuMarker);
                }
                cpuTurn = !cpuTurn;
                playerTurn = !playerTurn;
            }, 1000);
        }
    }
});

function cpuMove() {
    var totalBoxes = 9;
    var availableBoxes = [];
    for (var i = 1; i < totalBoxes+1; i++) {
        if ($('#box'+ i).text() === '') {
            availableBoxes.push('box'+i);
        }
    }
    return availableBoxes[0];
}

function checkForWinner(markedBoxes, mark) {
    markedBoxes.sort();
    var winningBoxCombos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7],
        [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
    winningBoxCombos.forEach(function(combo) {
        if (markedBoxes.indexOf(combo[0]) > -1) {
            if (markedBoxes.indexOf(combo[1]) > -1) {
                if (markedBoxes.indexOf(combo[2]) > -1) {
                    endGame(mark);
                }
            }
        }
    });
}

function endGame(mark) {
    gameOver = true;
    if (mark === playerMarker) {
        $('#setup').text('Congratulations YOU WIN!')
            .css('visibility', 'visible');
    }
    else {
        $('#setup').text('Sorry you lose, the Computer wins')
            .css('visibility', 'visible');
    }
    playerBoxes = [];
    cpuBoxes = [];
}




