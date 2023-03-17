var welcomeBtn = document.querySelector('#welcomeBtn');
var submitBtn = document.querySelector('button.submitBtn');
var welcomeScr = document.querySelector('#welcomeScreen');
var timeLeft = document.querySelector('#timer');
var submitScore = document.querySelector('#endScreen');
var userScore = document.querySelector('#user-score');
var userNameInput;
var answerChoices = document.getElementById('answers');
var ul = document.querySelector('ul');
var questionsAnswers = document.querySelector('#questionsAnswers');
var quesAnsEl = document.querySelector('.ask');
var awardDisplay = document.querySelector('.answerConfirmation');
var choicesWrap = document.querySelector('.choices');
// var questionHead = document.getElementById('questions');
// var question = document.querySelector('#question');
// var ansBtn = document.querySelectorAll('.ansBtn');

var currentQuestion = 0;
var questionNumber = -1;
var answer;
var count = 300;

welcomeBtn.addEventListener('click', function () {
    welcomeScr.classList.add('hide');
    startTimer();
    displayQuestion();
});

function startTimer() {
  timeLeft.classList.remove('hide');

  var timer = setInterval(function () {
    count--;
    timeLeft.innerText = 'Time Left: ' + count;

    if (count === 0 || questionNumber === questions.length) {
        clearInterval(timer);
        setTimeout(displayScore, 500);
    }
  }, 1000);
}


function displayQuestion() {
  questionsAnswers.classList.remove('hide');

  var question = questions[currentQuestion];
  
  quesAnsEl.textContent = question.ask;

  choicesWrap.innerHTML = '';
  
  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var button = document.createElement('button');
    
    button.textContent = choice;
    button.dataset.index = i;
    
    button.addEventListener('click', checkAnswer);
    
    choicesWrap.append(button);
  }
}

function checkAnswer(eventObj) {
  var index = eventObj.target.dataset.index;
  
  // Check if the index of the button that was clicked matches the index
  // of the correct answer(answerIndex)
  
  if (index == questions[currentQuestion].answerIndex) {
    // localStorage.setItem(userScore, +10);
    awardDisplay.innerText = 'You got it!';
    awardDisplay.setAttribute('style', 'color: green;');
    awardDisplay.classList.remove('hide');
    setTimeout(function() {
      awardDisplay.classList.add('hide');
    }, 3000);
  } else {
    count -= 10;
    awardDisplay.innerText = 'Survey says: Nnnnnope';
    awardDisplay.setAttribute('style', 'color: red;');
  }
  currentQuestion++

  if (index == questions.length) {
    endGame();
  }
}

function endGame() {
  questionsAnswers.classList.add('hide');
  submitScore.classList.remove('hide');
}

choicesWrap.addEventListener('click', displayQuestion);
  