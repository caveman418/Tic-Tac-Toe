(function() {
    const newGameButton = document.querySelector('.new-game-button');
    const startGamebutton = document.querySelector('.start-game');
    const popupMenu = document.querySelector('.popup');

    newGameButton.addEventListener('click', () => {
        popupMenu.classList.add('active');
    });

    startGamebutton.addEventListener('click', () => {
        popupMenu.classList.remove('active');
    })
})();

