const BOARD_SIZE = 10; // need to externalize, not working with require in browser environment


const p1Container = document.querySelector('.p1-container');
const p2Container = document.querySelector('.p2-container');


// create player 1 gameboard
for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
        const divs = document.createElement('div');
        divs.classList.add('p1_div');
        p1Container.appendChild(divs);
    }
}

// create player 2 gameboard
for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
        const divs = document.createElement('div');
        divs.classList.add('p2_div');
        p2Container.appendChild(divs);
    }
}