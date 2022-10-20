'use strict';
// Selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
//starting consition

let score, currentScore, activePlayer;
let init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  diceEl.classList.add('hidden');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice functionallity
btnRoll.addEventListener('click', function () {
  if (
    player1El.classList.contains('player--winner') ||
    player0El.classList.contains('player--winner')
  ) {
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
  }

  // 1. Generating a random dice Roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. Display Dice
  console.log(dice);
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }
  diceEl.src = `dice-${dice}.png`;
  // 3. check for rolled 1; if it's true switch to next player
  if (dice != 1) {
    //Add dice to cuurent score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    score[activePlayer] = currentScore;
  } else {
    currentScore = score[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    //switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  score0El.textContent = score[0];
  score1El.textContent = score[1];
  if (score[0] >= score[1]) {
    player0El.classList.add('player--winner');
    player1El.classList.remove('player--winner');
  } else {
    player1El.classList.add('player--winner');
    player0El.classList.remove('player--winner');
  }
});
btnNew.addEventListener('click', init);
