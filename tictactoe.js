
var playerMarker = '';
var cpuMarker = '';
var playerTurn = true;
var boxSelected = '';


$("#startBtn").click(function(event) {
    runSetup();
});

function runSetup() {
    $('#setup').text('Would you like to be X or O?');
    var xButton = $('<button id="xButton"></button>').text('X');
    var oButton = $('<button id="oButton"></button>').text('O');
    $('#setup').append(xButton, oButton);

    $("#setup").click(function(event) {
        if (event.target.id === "xButton") {
            playerMarker = 'X';
            cpuMarker = 'O';
            $('#setup').text('You have selected '+playerMarker+', lets begin!');
        }
        if (event.target.id === 'oButton') {
            playerMarker = 'O';
            cpuMarker = 'X';
            $('#setup').text('You have selected '+playerMarker+', lets begin!');
        }
    });
}

$(".wrapper").click(function(event) {
    var boxSelected = event.target.id;
})

function gamePlay() {
    if (playerTurn) {
        $(boxSelected).text(playerMarker);
    }
    else {
        cpuMove();
    }

}

function cpuMove() {

}