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


const xChecks = [];
const oChecks = [];
let winner;

const boxes = document.querySelectorAll('.box');
for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function () {
        winner = '';
        const elementSelected = document.querySelector('.box-' + (i + 1));
        elementSelected.style.backgroundImage = `url(img/${turn}.png)`;
        elementSelected.style.backgroundSize = 'contain';
        elementSelected.style.backgroundRepeat = 'no-repeat';
        elementSelected.style.backgroundPosition = 'center';
        if(turn === 'x') {
            xChecks.push(i + 1);
            xChecks.sort(function(a, b) { return a-b; });
        }
        else {
            oChecks.push(i  + 1);
            oChecks.sort(function(a, b) { return a-b; });
        }
        console.log(xChecks, oChecks);
        for(let i =  0; i < correctCombinations.length; i++) {
            if(
                correctCombinations[i].includes(xChecks[0])
                &&
                correctCombinations[i].includes(xChecks[1])
                &&
                correctCombinations[i].includes(xChecks[2])
            ) {
                winner = 'x';
            }
            else if(
                correctCombinations[i].includes(oChecks[0])
                &&
                correctCombinations[i].includes(oChecks[1])
                &&
                correctCombinations[i].includes(oChecks[2])
            ) {
                winner = 'o';
            }
        }
        turn = turn === 'x' ? 'o' : 'x';
        if(winner !== '') document.querySelector('.result').innerText = winner.toUpperCase() + ' Won!';
        // ---------

    });
}
