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

// const combo = {
//     1: [[2, 3],[4,7], [5,9]],
//     2: [[1, 3]],
// }
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

// winning path to not be replicated (fixing a bug)
let correctPath;

// Global flag if single player mode enabled
let singlePlayer = localStorage.getItem('singlePlayer');
if(singlePlayer === 'true') {
    document.querySelector('.single-player').innerText = '🔂Switch back to multiplayer.🔂';
    singlePlayer = true;
} else {
    document.querySelector('.single-player').innerText = '🔂 Switch Single player Mode 🔂';
    singlePlayer = false;
}

const boxes = document.querySelectorAll('.box');


let sameSelection = false;

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
    correctPath = -1;
};

const selectedBox = function (i) {
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
        sameSelection = false;
    } else {
        sameSelection = true;
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
            if(correctPath !== i) document.querySelector('.x-score').innerHTML = ++xScore;
            localStorage.setItem('xScore', xScore);
            correctPath = i;
            break;
        }
        else if(oCorrectChecks >= 3) {
            winner = 'o';
            if(correctPath !== i) document.querySelector('.o-score').innerHTML = ++oScore;
            localStorage.setItem('oScore', oScore);
            correctPath = i;
            break;
        }
    }
    // Switching turns in the end of the callback of the event.
    turn = turn === 'x' ? 'o' : 'x';
    if(winner !== '') {
        document.querySelector('.result').innerText = winner.toUpperCase() + ' Won! 🏆';
        document.querySelector('.win-audio').play();
        setTimeout(clearGame, 1000);
        // clearGame();
    }
    else if(oChecks.length + xChecks.length === 9) {
        document.querySelector('.result').innerText = 'Tie :(';
        document.querySelector('.t-score').innerHTML = ++tScore;
        localStorage.setItem('tScore', tScore);
        setTimeout(clearGame, 1000);
        // clearGame();
    } else {
        document.querySelector('.result').innerText = turn.toUpperCase() + ' Turn.';
    }
};

for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function() {
        selectedBox(i);
        if(singlePlayer && (xChecks.length + oChecks.length) !== 9 && !sameSelection) AIPlayer();
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

const AIPlayer = function() {
    let closeToWin;
    let closeToLose;
    let nothingToHappen = true;
    let checkedBox;
    for(let i = 0; i < correctCombinations.length; i++) {
        closeToWin = correctCombinations[i].includes(oChecks[0]) && correctCombinations[i].includes(oChecks[1]);
        if(oChecks[2] !== undefined) {
            closeToWin = correctCombinations[i].includes(oChecks[0]) && correctCombinations[i].includes(oChecks[2]);
            if(!closeToWin) closeToWin = correctCombinations[i].includes(oChecks[0]) && correctCombinations[i].includes(oChecks[2]);
        }
        if(oChecks[3] !== undefined) {
            closeToWin = correctCombinations[i].includes(oChecks[0]) && correctCombinations[i].includes(oChecks[3]);
            if(!closeToWin) closeToWin = correctCombinations[i].includes(oChecks[1]) && correctCombinations[i].includes(oChecks[3]);
            if(!closeToWin) closeToWin = correctCombinations[i].includes(oChecks[2]) && correctCombinations[i].includes(oChecks[3]);
        }
        closeToLose = correctCombinations[i].includes(xChecks[0]) && correctCombinations[i].includes(xChecks[1]);
        if(xChecks[2] !== undefined) {
            closeToLose = correctCombinations[i].includes(xChecks[0]) && correctCombinations[i].includes(xChecks[2]);
            if(!closeToLose) closeToLose = correctCombinations[i].includes(xChecks[0]) && correctCombinations[i].includes(xChecks[2]);
        }
        if(xChecks[3] !== undefined) {
            closeToLose = correctCombinations[i].includes(xChecks[0]) && correctCombinations[i].includes(xChecks[3]);
            if(!closeToLose) closeToLose = correctCombinations[i].includes(xChecks[1]) && correctCombinations[i].includes(xChecks[3]);
            if(!closeToLose) closeToLose = correctCombinations[i].includes(xChecks[2]) && correctCombinations[i].includes(xChecks[3]);
        }
        if(closeToWin) {
            for(let j = 0; j < correctCombinations[i].length; j++) {
                checkedBox = document.querySelector('.box-' + correctCombinations[i][j]);
                if (!checkedBox.classList.contains('selected') && winner === '') {
                    selectedBox(correctCombinations[i][j] - 1);
                    nothingToHappen = false;
                    break;
                }
            }
            break;
        }
        else if(closeToLose) {
            for(let j = 0; j < correctCombinations[i].length; j++) {
                checkedBox = document.querySelector('.box-' + correctCombinations[i][j]);
                if (!checkedBox.classList.contains('selected') && winner === '') {
                    selectedBox(correctCombinations[i][j] - 1);
                    nothingToHappen = false;
                    break;
                }
            }
            break;
        }
    }
    if(nothingToHappen) {
        if(!document.querySelector('.box-5').classList.contains('selected')) {
            selectedBox(4);
        } else if(!document.querySelector('.box-1').classList.contains('selected')) {
            selectedBox(0);
        } else if(!document.querySelector('.box-3').classList.contains('selected')) {
            selectedBox(2);
        } else if(!document.querySelector('.box-7').classList.contains('selected')) {
            selectedBox(6);
        } else if(!document.querySelector('.box-9').classList.contains('selected')) {
            selectedBox(8);
        }
        else {
            while(true) {
                let boxNumber = Math.floor(Math.random() * 8);
                let checkedBox = document.querySelector('.box-' + (boxNumber + 1));
                if (!checkedBox.classList.contains('selected') && winner === '') {
                    selectedBox(boxNumber);
                    break;
                } else if(winner === 'x' || winner === 'o') {
                    break;
                }
            }
        }
    }
};


const switchToSingleElement = function() {
    if(!singlePlayer) {
        singlePlayer = true;
        document.querySelector('.single-player').innerText = '🔂 Switch back to multiplayer. 🔂';
        localStorage.setItem('singlePlayer', 'true');
    }
    else {
        singlePlayer = false;
        document.querySelector('.single-player').innerText = '🔂 Switch Single player Mode 🔂';
        localStorage.setItem('singlePlayer', 'false');
    }
};

document.querySelector('.single-player').addEventListener('click', switchToSingleElement);

const roomGenerator = function() {
    let room_number = Math.floor(Math.random() * 1000);
    return room_number;
};


document.querySelector('.online-mode').addEventListener('click', function () {
    let room_number = roomGenerator();
    document.querySelector('.single-player').style.display = 'none';
    document.querySelector('.online-indicator').style.display = 'block';
    document.querySelector('.room-number').innerText = room_number;
});