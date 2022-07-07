const startButtonEl = document.getElementById('start-game')
const gameLaunchEl = document.getElementById('play-game')
const gameContainerEl = document.getElementById('game-container')
const bearsContainerEl = document.getElementById('bear')


var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function startGame () {
    console.log('Game Started')
    hideContainers();

    gameContainerEl.removeAttribute('hidden');
    
}

function hideContainers() {
    startButtonEl.setAttribute("hidden", true);
    gameContainerEl.setAttribute("hidden", true);
    bearsContainerEl.setAttribute("hidden", true);
};

startButtonEl.addEventListener('click', startGame)