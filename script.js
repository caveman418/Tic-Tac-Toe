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
        let pos = square.id.slice(-1);
        square.addEventListener('mousedown', () => {
            let player = (gameBoard.counter() % 2 === 0) ? 'x':'o';
            gameBoard.add(pos,player);
            square.textContent = gameBoard.searchIndex(pos);
        });
    });
})();

const gameBoard = (function() {
    let count = 0;
    let board = (new Array(9)).fill('');
    
    const counter = () => {
        return count;
    }
    const searchIndex = (index) => {
        return board[index];
    }
    const add = (pos,player) => {
        if (board[pos]==='') {
            count++;
            board[pos] = player;
        }
    }
    const clear = () => {
        count = 0;
        board.fill('');
    }
    return {counter, searchIndex, add, clear};
})();
