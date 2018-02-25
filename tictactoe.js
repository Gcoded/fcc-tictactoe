
var playerMarker = '';
var cpuMarker = '';
var gameActive = false;
var playerTurn = true;
var playerMarkCSS = '';
var cpuMarkCSS = '';
var playerBoxes = [];
var cpuBoxes = [];


$('#startBtn').click(function() {
    if (!gameActive) {
        playerBoxes = [];
        cpuBoxes = [];
        playerTurn = true;
        for (var i = 1; i < 10; i++) {
            $('#box'+i).text('').css('background-color', 'transparent')
                .removeClass();
        }

        var xButton = $('<button class="marker" id="xButton"></button>').text('X');
        var oButton = $('<button class="marker" id="oButton"></button>').text('O');
        $('#setup').text('Choose your mark: ').append(xButton, oButton)
            .css('visibility', 'visible');

        $(".marker").click(function(event) {
            if (event.target.id === 'xButton') {
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

            gameActive = true;
        });
    }
});

$('.box').click(function(event) {
    var boxSelected = '';

    if (playerTurn && gameActive) {
        boxSelected = event.target.id;
        if ($('#'+boxSelected).text() === '') {
            $('#'+boxSelected).addClass(playerMarkCSS).text(playerMarker);
            playerBoxes.push(parseInt(boxSelected.slice(-1)));
            if (playerBoxes.length > 2) {
                checkForWinner(playerBoxes, playerMarker);
            }
            playerTurn = !playerTurn;
        }
    }

    if (!playerTurn && gameActive) {
        var cpuMoveTimer = setTimeout(function() {
            boxSelected = cpuMove();
            $('#'+boxSelected).addClass(cpuMarkCSS).text(cpuMarker);
            cpuBoxes.push(parseInt(boxSelected.slice(-1)));
            if (cpuBoxes.length > 2) {
                checkForWinner(cpuBoxes, cpuMarker);
            }
            playerTurn = !playerTurn;
        }, 1000);
    }
});

function cpuMove() {
    var totalBoxes = 9;
    var availableBoxes = [];
    for (var i = 1; i < totalBoxes+1; i++) {
        if ($('#box'+i).text() === '') {
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
        if (markedBoxes.indexOf(combo[0]) > -1 &&
            markedBoxes.indexOf(combo[1]) > -1 &&
            markedBoxes.indexOf(combo[2]) > -1) {
            combo.forEach(function(num) {
                $('#box'+num).css('background-color', '#ffff66');
            });
            endGame(mark);
        }
    });
    if (markedBoxes.length === 5 && gameActive) {
            endGame();
        }
}

function endGame(mark) {
    gameActive = false;
    if (mark === playerMarker) {
        $('#setup').text('YOU WIN, Nice Job!')
            .css('visibility', 'visible');
    }
    else if (mark === cpuMarker) {
        $('#setup').text('Computer Wins, Sorry Try Again')
            .css('visibility', 'visible');
    }
    else {
        $('#setup').text('Its a Draw, Nobody Wins')
            .css('visibility', 'visible');
    }
}




