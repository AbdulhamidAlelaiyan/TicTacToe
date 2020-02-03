let turn = 'x';
const correctCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],          // These Are the combination in which if one player made he/she will win.
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let xChecks = []; // What player X checked in the TTT Grid.
let oChecks = []; // What player O checked in the TTT Grid.
let winner;
let localStorage = window.localStorage;

// Using localstorage object to store data on the clinet
let xScore = localStorage.getItem('xScore') ? localStorage.getItem('xScore') : 0;
let oScore = localStorage.getItem('oScore') ? localStorage.getItem('oScore') : 0;
let tScore = localStorage.getItem('tScore') ? localStorage.getItem('tScore') : 0;

// Storing how many correct checks players made.
let xCorrectChecks = 0;
let oCorrectChecks = 0;

// Setting the scores on the web page.
document.querySelector('.x-score').innerHTML = xScore;
document.querySelector('.o-score').innerHTML = oScore;
document.querySelector('.t-score').innerHTML = tScore;

const boxes = document.querySelectorAll('.box');

// Function to reset the current game.
const clearGame = function() {
    for (let i = 0; i < boxes.length; i++)  {
        const elementSelected = document.querySelector('.box-' + (i + 1));
        elementSelected.classList.remove('selected');
        elementSelected.style.backgroundImage = '';
    }
    xChecks = [];
    oChecks = [];
    winner = '';
    turn = 'x';
}

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function () {
        winner = '';
        const elementSelected = document.querySelector('.box-' + (i + 1));
        if(!elementSelected.classList.contains('selected')) { // Checking if it was already selected
            elementSelected.classList.add('selected');
            elementSelected.style.backgroundImage = `url(img/${turn}.png)`;
            elementSelected.style.backgroundSize = 'contain';
            elementSelected.style.backgroundRepeat = 'no-repeat';
            elementSelected.style.backgroundPosition = 'center';
            elementSelected.classList.add('selected');
            if(turn === 'x') document.querySelector('.click1').play();
            else document.querySelector('.click2').play();
        } else {
            return;
        }
        if(turn === 'x') {
            xChecks.push(i + 1);
            xChecks.sort(function(a, b) { return a-b; });
        }
        else {
            oChecks.push(i  + 1);
            oChecks.sort(function(a, b) { return a-b; });
        }

        for(let i =  0; i < correctCombinations.length; i++) {
            xCorrectChecks = 0;
            oCorrectChecks = 0;
            // Setting the number of correct checks each player made.
            for(let j =  0; j < xChecks.length; j++) {
                if(correctCombinations[i].includes(xChecks[j])) {
                    xCorrectChecks++;
                }
            }

            for(let j =  0; j < oChecks.length; j++) {
                if(correctCombinations[i].includes(oChecks[j])) {
                    oCorrectChecks++;
                }
            }

            // See if the correct checks are more than 3 then he made a correct path somewhere
            if(xCorrectChecks >= 3) {
                winner = 'x';
                document.querySelector('.x-score').innerHTML = ++xScore;
                localStorage.setItem('xScore', xScore);
                break;
            }
            else if(oCorrectChecks >= 3) {
                winner = 'o';
                document.querySelector('.o-score').innerHTML = ++oScore;
                localStorage.setItem('oScore', oScore);
                break;
            }
        }
        // Switching turns in the end of the callback of the event.
        turn = turn === 'x' ? 'o' : 'x';
        if(winner !== '') {
            document.querySelector('.result').innerText = winner.toUpperCase() + ' Won! 🏆';
            document.querySelector('.win-audio').play();
            clearGame();
        }
        else if(oChecks.length + xChecks.length === 9) {
            document.querySelector('.result').innerText = 'Tie :(';
            document.querySelector('.t-score').innerHTML = ++tScore;
            localStorage.setItem('tScore', tScore);
            clearGame();
        } else {
            document.querySelector('.result').innerText = turn.toUpperCase()  + ' Turn.';
        }
    });
}

// A function registered to an event that will reset everything including the scores
// and the data stored using the Localstorage object.
const resetGame = function() {
    clearGame();
    xScore = 0;
    oScore = 0;
    tScore = 0;
    document.querySelector('.result').innerText = 'Game reset!';
    document.querySelector('.x-score').innerText = xScore;
    document.querySelector('.o-score').innerText = oScore;
    document.querySelector('.t-score').innerHTML = tScore;
    localStorage.setItem('xScore', 0);
    localStorage.setItem('oScore', 0);
    localStorage.setItem('tScore', 0);
};

document.querySelector('.clear-game').addEventListener('click', resetGame);