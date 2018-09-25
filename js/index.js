//list that hold cards**
const deck = document.querySelector('.deck');
 deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (clockOff) { 
            startClock();
            clockOff = false;
 }
        if (toggledCards.length === 2) {  
            addMove();
            checkForMatch(clickTarget);
            checkScore();
    }
 }
});
function isClickValid(clickTarget) {
    return( clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)
  );
  }
function toggleCard(card){ 
  card.classList.toggle('open');
  card.classList.toggle('show');
    }
  let toggledCards = [];//array to store cards**
   function addToggleCard(clickTarget){ //function for cards on array**
        toggledCards.push(clickTarget);
        console.log(toggledCards);
    }

 function checkForMatch() { 
    const total_pairs = 8;
    if (toggledCards[0].innerHTML === toggledCards[1].innerHTML) {
            toggledCards[0].classList.toggle('match');
            toggledCards[1].classList.toggle('match');
            toggledCards = [];
            matched++;
            console.log(matched);
            if (matched === total_pairs) {
                gameOver();
                console.log("Game Over!"); 
            }
        } else {
            setTimeout(() => {
                toggleCard(toggledCards[0]);
                toggleCard(toggledCards[1]);
                toggledCards = [];
                }, 1000);
            }
    }

 // Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) { 
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
  }
    return array;
}
function shuffleDeck() { 
    const cardsToShuffle =Array.from(document.querySelectorAll('.deck li')); 
  const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards){ 
        deck.appendChild(card);
    }
}
shuffleDeck();
 let moves = 0;
function addMove(){
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
function checkScore() { 
    if ( moves === 12 || moves === 16 ) {
        hideStar();
    }
}
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
        break;
       }
     }
  }
 let clockOff = true;
 let time = 0;
 let clockId;
//function starts timer/clock**
function startClock() { 
    clockId = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
}
function displayTime() { 
   const clock = document.querySelector('.clock');
   clock.innerHTML = time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
     if (seconds < 10){
     clock.innerHTML = `${minutes} : 0${seconds}`;}
        else {
       clock.innerHTML = `${minutes} : ${seconds}`;
        }
    }
//function stops timer/clock**
function stopClock() {
    clearInterval(clockId);
}

//Modal function**
function toggleModal() { 
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}
 function writeModalStats() { 
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars(); 
   
  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`; 
}
 function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
      if (star.style.display !== 'none') {
        starCount++;
       }
   }
     return starCount;
}
//manipulation for modal**
document.querySelector('.modal_cancel').addEventListener('click', () => {toggleModal()}); 
document.querySelector('.restart').addEventListener('click', resetGame); 
document.querySelector('.modal_replay').addEventListener('click', replayGame);

function resetGame() { //function to reset game**
    resetClockAndTime();
    resetMoves();
    resetStars();
    resetCards();
    toggledCards = [];
    shuffleDeck();
    matched = 0;
} 
//functions below resets/displays timer/clock/moves & stars to 0 **
function resetClockAndTime() { 
        stopClock();
        clockOff = true;
        time = 0;
        displayTime();
 } 
 function resetMoves() { 
        moves = 0;
        document.querySelector('.moves').innerHTML = moves;
    }
function resetStars() {
   stars = 0;
   const starList = document.querySelectorAll('.stars li');
   for (star of starList) {
   star.style.display = 'inLine';
    }
}
function replayGame() {
    resetGame();
    toggleModal();
}
function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for  (let card of cards) {
        card.className = 'card'// function resets cards by clicking replay button**
    }
}
let matched = 0;
function gameOver() {
      stopClock();
      writeModalStats();
      toggleModal();
 }