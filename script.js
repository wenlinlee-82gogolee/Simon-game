'use strict';

const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).on('keypress', function () {
  if (!started) {
    nextSequence();
    $('#level-title').text(`Level ${level}`);
    let started = true;
  }
});

$('.btn').on('click', function (e) {
  const userClickedColor = e.target.id;
  userClickedPattern.push(userClickedColor);
  playSound(userClickedColor);
  animatePress(userClickedColor);
  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = function (currentClickedIndex) {
  if (
    gamePattern[currentClickedIndex] === userClickedPattern[currentClickedIndex]
  ) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    gameover();
    gameReset();
  }
};

const nextSequence = function () {
  userClickedPattern = [];
  level++;
  $('#level-title').html(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColor);
};

const animatePress = function (currentColor) {
  $(`.${currentColor}`).addClass('pressed');

  setTimeout(() => {
    $(`.${currentColor}`).removeClass('pressed');
  }, 100);
};

function playSound(name) {
  const audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

const gameover = function () {
  playSound('wrong');
  $('body').addClass('game-over');
  $('#level-title').text('Game Over! Press a Key to Restart');
  setTimeout(() => $('body').removeClass('game-over'), 200);
};

const gameReset = function () {
  level = 0;
  gamePattern = [];
  started = false;
};
