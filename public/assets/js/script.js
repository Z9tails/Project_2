const startButtonEl = document.getElementById('start-game')
const gameLaunchEl = document.getElementById('play-game')
const gameContainerEl = document.getElementById('game-container')
const bearsContainerEl = document.getElementById('bear')

var audio = document.getElementById('audio')
var count = 0;


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
    playAudio();
    
}

function playAudio () {
    if(count == 0) {
        count = 1;
        audio.play();
    } else {
        count = 0;
        audio.pause();
    }
}

function hideContainers() {
    startButtonEl.setAttribute("hidden", true);
    gameContainerEl.setAttribute("hidden", true);
    bearsContainerEl.setAttribute("hidden", true);
};

startButtonEl.addEventListener('click', startGame)