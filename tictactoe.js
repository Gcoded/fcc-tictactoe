
var playerChoice = '';

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
            playerChoice = 'X';
            $('#setup').text('You have selected '+playerChoice+', lets begin!');
        }
        if (event.target.id === 'oButton') {
            playerChoice = 'O';
            $('#setup').text('You have selected '+playerChoice+', lets begin!');
        }
    });
}