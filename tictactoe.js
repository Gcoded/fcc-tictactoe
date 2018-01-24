
var playerMarker = '';
var cpuMarker = '';
var gameStarted = false;
var playerTurn = true;
var boxSelected = '';


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
            cpuMarker = 'O';
        }
        if (event.target.id === 'oButton') {
            playerMarker = 'O';
            cpuMarker = 'X';
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
            $('#'+boxSelected).text(playerMarker);
            playerTurn = !playerTurn;
        }
        var cpuMoveTimer = setTimeout(function() {
            boxSelected = cpuMove();
            $('#'+boxSelected).text(cpuMarker);
            playerTurn = !playerTurn;
        }, 1000);
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

