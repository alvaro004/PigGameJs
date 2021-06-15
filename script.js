'use strict';
//Selecting elements
const score0Elem = document.querySelector('#score--0');
const score1Elem = document.getElementById('score--1');
const diceImage = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentElem0 = document.getElementById('current--0');
const currentElem1 = document.getElementById('current--1');
const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');
let scores, CurrentPlayer, currentScore, playing;

const init = function () {
  scores = [0, 0]; //both player iniatially have 0 scores
  CurrentPlayer = 0;
  currentScore = 0;
  playing = true;
  diceImage.classList.add('hiden-image'); // hide dice roll image
  player0Elem.classList.remove('player--winner');
  player1Elem.classList.remove('player--winner');
  player0Elem.classList.add('player--active');
  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  currentElem0.textContent = 0;
  currentElem1.textContent = 0;
};

const switchPlayer = function () {
  //Switch to the next player
  document.getElementById(`current--${CurrentPlayer}`).textContent = 0;
  currentScore = 0;
  CurrentPlayer = CurrentPlayer === 0 ? 1 : 0;
  // toggle add a class if is not there and remove if is there
  player0Elem.classList.toggle('player--active');
  player1Elem.classList.toggle('player--active');
};

//Calling the main function to set te variables to the init values
init();

//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${diceNumber}.png`; // selecting the source element of the image tag

    // 2.Diplay dice roll
    diceImage.classList.remove('hiden-image');

    // 3. Check for rolled 1: if true. switch to next player
    if (diceNumber !== 1) {
      //Add dice to the current Score
      currentScore += diceNumber;
      document.getElementById(`current--${CurrentPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//Holding the current values
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Hold the score of the current user
    scores[CurrentPlayer] += currentScore;
    // 2. Add current score to total score
    document.getElementById(`score--${CurrentPlayer}`).textContent =
      scores[CurrentPlayer];
    if (scores[CurrentPlayer] >= 100) {
      playing = false;
      diceImage.classList.add('hiden-image');
      document
        .querySelector(`.player--${CurrentPlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${CurrentPlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});
//Reseting the game
btnNew.addEventListener('click', init);
