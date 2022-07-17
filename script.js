// Player factory function

const Player = (name) => {

    let wins = 0;

    const winner = () => {wins++};
    const getWins = () => {return wins};

    return {name, winner, getWins};

}


// Event listener IIFE

(function() {

    const newGameButton = document.querySelector('.new-game-button');
    const startGameButton = document.querySelector('.start-game');
    const popup = document.querySelector('.popup');
    const playerOneInput = document.querySelector('#input-1');
    const playerTwoInput = document.querySelector('#input-2');
    const squares = document.querySelectorAll('.square');

    newGameButton.addEventListener('mousedown', () => {
        popup.classList.add('active');
    });

    startGameButton.addEventListener('mousedown', () => {
        popup.classList.remove('active');
        let playerOne = Player(playerOneInput.value);
        let playerTwo = Player(playerTwoInput.value);
        console.log(playerOne);
    });
    console.log(playerOne);
    
    
})();

console.log(playerOne);

// Board matrix module with methods to add/get the current board

const gameBoard = (function() {

    let board = (new Array(9)).fill('');

    const add = (pos,mark) => {
        board[pos] = mark;
    }
    const get = () => {
        return board;
    }

    return {add, get};

})();

