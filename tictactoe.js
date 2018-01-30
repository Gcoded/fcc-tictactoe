
var playerMarker = '';
var cpuMarker = '';
var gameStarted = false;
var playerTurn = true;
var cpuTurn = false;
var boxSelected = '';
var playerMarkCSS = '';
var cpuMarkCSS = '';


$("#startBtn").click(function(event) {
    if (!gameStarted){
        runSetup();
    }
});

function runSetup() {
    gameStarted = true;
    var xButton = $('<button class="marker" id="xButton"></button>').text('X');
    var oButton = $('<button class="marker" id="oButton"></button>').text('O');
    $('#setup').append(xButton, oButton);
    $('#setup').css('visibility', 'visible');

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
        if (playerTurn) {
            boxSelected = event.target.id;
            if ($('#'+boxSelected).text() === '') {
                $('#'+boxSelected).addClass(playerMarkCSS);
                $('#'+boxSelected).text(playerMarker);
                checkForWinner();
                playerTurn = !playerTurn;
                cpuTurn = !cpuTurn;
            }
        }
        if (cpuTurn) {
            var cpuMoveTimer = setTimeout(function() {
                boxSelected = cpuMove();
                $('#'+boxSelected).addClass(cpuMarkCSS);
                $('#'+boxSelected).text(cpuMarker);
                checkForWinner();
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

function checkForWinner() {
    var winningBoxCombos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7],
        [2,5,8], [3,6,9], [1,5,9], [3,5,7]];

    var markedBoxes = [];
    for (var i = 0; i < 9; i++) {
        if ($('#box'+ i).text() !== '') {
            markedBoxes.push(i);
        }
    }

    winningBoxCombos.forEach(function(combo) {
        for (var i = 0; i < i.length; i++) {
            // if (markedBoxes[i] === combo) {
            //     $('#setup').text('We have a WINNER!');
            //     $('#setup').css('visibility', 'visible');
            // }
        }
    });
}

