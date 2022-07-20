const squares = document.querySelectorAll('.square'); //global nodelist
let gameOver = false;

// Player factory function

const Player = (name) => {

    let wins = 0;

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const winner = () => {wins++};
    const getWins = () => {return wins};

    return {name, winner, getWins};

}


// Event listener IIFE

(function(squares) {

    let playerOne,playerTwo; //initialize player objects so they are scoped to this function

    const newGameButton = document.querySelector('.new-game-button');
    const startGameButton = document.querySelector('.start-game');
    const popup = document.querySelector('.popup');
    const playerOneInput = document.querySelector('#input-1');
    const playerTwoInput = document.querySelector('#input-2');
    const playerOneScore = document.querySelector('.player-one-score');
    const playerTwoScore = document.querySelector('.player-two-score');
    const turnDisplay = document.querySelector('.turn');

    function resetGame() {
        setTimeout(()=>{
            gameBoard.clear();
            gameBoard.updateDisp();
            turnDisplay.textContent = `${playerOne.name}'s turn`;
        },1000);
    }

    newGameButton.addEventListener('mousedown', () => {
        popup.classList.add('active');
    });

    startGameButton.addEventListener('mousedown', () => {
        popup.classList.remove('active');
        playerOne = Player(playerOneInput.value);
        playerTwo = Player(playerTwoInput.value);
        if (playerOne.name==='') playerOne.name = 'Player 1';
        if (playerTwo.name==='') playerTwo.name = 'Player 2';
        playerOneScore.textContent = `${playerOne.name}: 0`;
        playerTwoScore.textContent = `${playerTwo.name}: 0`;
        turnDisplay.textContent = `${playerOne.name}'s turn`;

        gameBoard.clear();
        gameBoard.updateDisp();
        playerOneInput.value = '';
        playerTwoInput.value = '';
    });
    
    squares.forEach((square) => {
        let squareID = Number(square.id.slice(-1));
        square.addEventListener('mousedown', () => {

            if (square.textContent!=='' || gameOver) {return}

            let mark;
            if (gameBoard.counter()%2===0) {
                mark = 'x';
                turnDisplay.textContent = `${playerTwo.name}'s turn`;
            } else {
                mark = 'o';
                turnDisplay.textContent = `${playerOne.name}'s turn`;
            }

            gameBoard.add(squareID,mark);
            gameBoard.updateDisp();

            if (gameBoard.checkWin()) {

                gameOver = true;
                if (mark==='x') {
                    playerOne.winner();
                    playerOneScore.textContent = `Player 1: ${playerOne.getWins()}`;
                    turnDisplay.textContent = `${playerOne.name} wins!`;
                } else {
                    playerTwo.winner();
                    playerTwoScore.textContent = `Player 1: ${playerTwo.getWins()}`;
                    turnDisplay.textContent = `${playerTwo.name} wins!`;
                }
                resetGame();

            } else if (!gameBoard.checkWin() && !gameBoard.get().includes('')) { //draw if no winner and board is full
                
                gameOver = true;
                turnDisplay.textContent = "It's a draw!";
                resetGame();

            }

        });
    });
    
})(squares);


// Board matrix module with methods to add/get the current board

const gameBoard = (function(squares) {

    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let board = (new Array(9)).fill('');
    let count = 0;

    const add = (pos,mark) => {
        count++;
        board[pos] = mark;
    }
    const get = () => {
        return board;
    }
    const counter = () => {
        return count;
    }
    const checkWin = () => {
        for (let combo of winCombos) {
            let track = combo.map((pos)=>{return board[pos]});
            if (!track.includes('')) {
                if (track[0]===track[1] && track[1]===track[2]) {
                    return true;
                };
            };
        };
        return false;
    };
    const clear = () => {
        board.fill('');
        count = 0;
        gameOver = false;
    }
    const updateDisp = () => {
        for (let i=0; i<board.length; i++) {
            squares[i].textContent = board[i];
        }
    }

    return {add, get, counter, checkWin, clear, updateDisp};

})(squares);
