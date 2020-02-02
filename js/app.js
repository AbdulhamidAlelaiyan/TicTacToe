let turn = 'x';

const boxes = document.querySelectorAll('.box');
for(let i  = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', function () {
        const elementSelected = document.querySelector('.box-' + (i + 1));
        elementSelected.style.backgroundImage = `url(img/${turn}.png)`;
        elementSelected.style.backgroundSize = 'contain';
        elementSelected.style.backgroundRepeat = 'no-repeat';
        elementSelected.style.backgroundPosition = 'center';
        turn = turn === 'x' ? 'o' : 'x';
    });
}
