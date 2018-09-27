//list that hold cards**
const deck = document.querySelector('.deck');
 deck.addEventListener('click', event => { //event listener determines event on clicking the card**
    const clickTarget = event.target;
    if (isClickValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (clockOff) { 
            startClock();//timer/clock starts to runs on 1st click**
            clockOff = false;
 }
        if (toggledCards.length === 2) {  
            addMove();
            checkForMatch(clickTarget);
            checkScore();
    }
 }
});
function isClickValid(clickTarget) {//function checks for card class, a match class when a card is clicked
    return( clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)
  );
  }
function toggleCard(card){ //function toggles cards**opens and shows cards
  card.classList.toggle('open');
  card.classList.toggle('show');
    }
  let toggledCards = [];//array to store cards**
   function addToggleCard(clickTarget){ //function for cards on array**
        toggledCards.push(clickTarget);
        console.log(toggledCards);
    }
 function checkForMatch() {//function checks for matched cards, cards that were clicked on** 
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
//function provided by Udacity- it shuffles the cards, changes the order/postion in list/ array
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
 let moves = 0;//number of moves increases by 1 when a match is attamped to be made//when the second card is click for a potential match
function addMove(){
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}
function checkScore() { //this fucntion will remove a star if a number of moves is made in a single game
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
function displayTime() { //function allows timer/clock to be displayed on game 
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
function toggleModal() { //function allows modal to be on and off**
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}
 function writeModalStats() { //stats from the game, will display on modal**
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars(); 
//code manipulates DOM for time, moves and stars while game is palyed **
  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`; 
}
 function getStars() {// function obtains number of current stars and the end of play
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
//cancel button with close model
document.querySelector('.modal_cancel').addEventListener('click', () => {toggleModal()});
//restart/reset button will restart/reset gameboard
document.querySelector('.restart').addEventListener('click', resetGame); 
//replay button on modal allows you to replay game
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
