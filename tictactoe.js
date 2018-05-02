
var playerMarker = '';
var cpuMarker = '';
var gameActive = false;
var playerTurn = true;
var playerMarkCSS = '';
var cpuMarkCSS = '';
var playerBoxes = [];
var cpuBoxes = [];
var winningBoxCombos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7],
        [2,5,8], [3,6,9], [1,5,9], [3,5,7]];


$('#startBtn').click(function() {
    playerBoxes = [];
    cpuBoxes = [];
    playerTurn = true;
    for (var i = 1; i < 10; i++) {
        $('#box'+i).text('').css('background-color', 'transparent')
            .removeClass('xMarker oMarker');
    }

    var xButton = $('<button class="marker" id="xButton"></button>').text('X');
    var oButton = $('<button class="marker" id="oButton"></button>').text('O');
    $('#message').text('Choose your mark: ').append(xButton, oButton);

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
        $('#message').text('You selected '+playerMarker+', lets begin!');
        var timer = setTimeout(function() {
            $('#message').css('visibility', 'hidden');
        }, 3000);

        $('section').addClass('fade-in');

        gameActive = true;
    });
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
    var availableBoxes = findOpenSpaces();
    var numOfAvailableBoxes = availableBoxes.length;
    var oddBoxes = availableBoxes.filter(function(box) {
            return (box % 2 !== 0);
        });
    var randomBox = Math.floor(Math.random() * numOfAvailableBoxes);
    var randomOddBox = Math.floor(Math.random() * oddBoxes.length);
    var getWin = '';
    var blockWin = '';
    var bestMove = '';

    getWin = oneMoreToWin(cpuBoxes);
    blockWin = oneMoreToWin(playerBoxes);

    if (numOfAvailableBoxes === 9) {
        bestMove = 'box'+oddBoxes[randomOddBox];
    }
    else if (numOfAvailableBoxes === 8) {
        if (availableBoxes.indexOf(5) > -1)
            bestMove = 'box5';
        else
            bestMove = 'box'+oddBoxes[randomOddBox];
    }
    else if (getWin) {
        bestMove = getWin;
    }
    else if (blockWin) {
        bestMove = blockWin;
    }
    else {
        bestMove = 'box'+availableBoxes[randomBox];
    }

    return bestMove;
}

function oneMoreToWin(markedBoxes) {
    var availableBoxes = findOpenSpaces();
    var boxToWin = '';
    for (var i = 0; i < winningBoxCombos.length; i++) {
        var combo = winningBoxCombos[i];
        //check if player has 2 out of 3 in a winning combo
        if ((markedBoxes.indexOf(combo[0]) > -1 && markedBoxes.indexOf(combo[1]) > -1
                && availableBoxes.indexOf(combo[2]) > -1) ||
            (markedBoxes.indexOf(combo[1]) > -1 && markedBoxes.indexOf(combo[2]) > -1
                && availableBoxes.indexOf(combo[0]) > -1) ||
            (markedBoxes.indexOf(combo[0]) > -1 && markedBoxes.indexOf(combo[2]) > -1
                && availableBoxes.indexOf(combo[1]) > -1)) {

            combo.forEach(function(num) {
                if (markedBoxes.indexOf(num) === -1) {
                    boxToWin = 'box'+num;
                }
            });
            break;
        }
    }
    return boxToWin;
}

function findOpenSpaces() {
    var openSpaces = [];
    for (var i = 1; i <= 9; i++) {
        if ($('#box'+i).text() === '') {
            openSpaces.push(i);
        }
    }
    return openSpaces;
}

function checkForWinner(markedBoxes, mark) {
    markedBoxes.sort();
    winningBoxCombos.forEach(function(combo) {
        if (markedBoxes.indexOf(combo[0]) > -1 &&
            markedBoxes.indexOf(combo[1]) > -1 &&
            markedBoxes.indexOf(combo[2]) > -1) {
            combo.forEach(function(num) {
                $('#box'+num).css('background-color', '#ffffb3');
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
        $('#message').text('YOU WIN, Nice Job!')
            .css('visibility', 'visible');
    }
    else if (mark === cpuMarker) {
        $('#message').text('Computer Wins, Sorry Try Again')
            .css('visibility', 'visible');
    }
    else {
        $('#message').text('Its a Draw, Nobody Wins')
            .css('visibility', 'visible');
    }
}





