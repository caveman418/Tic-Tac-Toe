(function() {
    const newGameButton = document.querySelector('.new-game-button');
    const startGamebutton = document.querySelector('.start-game');
    const popupMenu = document.querySelector('.popup');
    const squares = document.querySelectorAll('.square');

    newGameButton.addEventListener('mousedown', () => {
        popupMenu.classList.add('active');
    });

    startGamebutton.addEventListener('mousedown', () => {
        popupMenu.classList.remove('active');
    });

    squares.forEach((square) => {
        square.addEventListener('mousedown', () => {
            let player = (gameBoard.counter() % 2 === 0) ? 'x':'o';
            gameBoard.add(square.id.slice(-1),player);
            Display.update();
        })
    })
})();

const gameBoard = (function() {
    let count = 0;
    let board = (new Array(9)).fill('');
    const counter = () => {
        return count;
    }
    const current = () => {
        return board;
    }
    const add = (pos,player) => {
        count++;
        board[pos] = player;
    }
    const clear = () => {
        count = 0;
        board.fill('');
    }
    return {counter, current, add, clear};
})();