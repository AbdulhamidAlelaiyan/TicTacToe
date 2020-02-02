let turn = 'x';
const correctCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

let xChecks = [];
let oChecks = [];
let winner;
let localStorage = window.localStorage;

let xScore = localStorage.getItem('xScore') ? localStorage.getItem('xScore') : 0;
let oScore = localStorage.getItem('oScore') ? localStorage.getItem('oScore') : 0;
let tScore = localStorage.getItem('tScore') ? localStorage.getItem('tScore') : 0;

let xCorrectChecks = 0;
let oCorrectChecks = 0;

document.querySelector('.x-score').innerHTML = xScore;
document.querySelector('.o-score').innerHTML = oScore;
document.querySelector('.t-score').innerHTML = tScore;

const boxes = document.querySelectorAll('.box');

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
        if(!elementSelected.classList.contains('selected')) {
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

document.querySelector('.clear-game').addEventListener('click', function() {
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
});