var welcomeBtn = document.querySelector('#welcomeBtn');
var submitBtn = document.querySelector('button.submitBtn');
var welcomeScr = document.querySelector('#welcomeScreen');
var timeLeft = document.querySelector('#timer');
var submitScore = document.querySelector('#endScreen');
var userScore = document.querySelector('#user-score');
var userName = document.querySelector('#userName');
var answerChoices = document.getElementById('answers');
var ul = document.querySelector('ul');
var questionsAnswers = document.querySelector('#questionsAnswers');
var quesAnsEl = document.querySelector('#ask');
var awardDisplay = document.querySelector('.answerConfirmation');
var choicesWrap = document.querySelector('.choices');
var endBtn = document.querySelector('#endBtn');
var joinLeaderboardBtn = document.querySelector('#submitBtn');
var leaderboardList = document.querySelector('#leaderboard-list');
var leaderboardUser = document.querySelector('.leader-user');
var leaderboardScore = document.querySelector('.leader-score');
var viewHighScores = document.querySelector('#viewHighScores');
var writeUser = document.querySelector('.leader-user');
var writeScore = document.querySelector('.leader-score');

var currentQuestion = 0;
var questionNumber = -1;
var answer;
var scoreCount = 0;
var timeCount = 300;
var timerInterval;

welcomeBtn.addEventListener('click', function () {
    welcomeScr.classList.add('hide');
    startTimer();
    displayQuestion();
});

function startTimer() {
  timeLeft.classList.remove('hide');

  timerInterval = setInterval(function () {
    timeCount--;
    timeLeft.innerText = 'Time Left: ' + timeCount;

    if (timeCount <= 0 ) {
        endGame();
    }
  }, 1000);
}


function displayQuestion() {
  questionsAnswers.classList.remove('hide');

  var question = questions[currentQuestion];

  if (currentQuestion === questions.length) {
    endGame();
  }

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

function checkAnswer(eventObj) {
  var index = eventObj.target.dataset.index;
  
  if (index == questions[currentQuestion].answerIndex) {
    var x = 10;
    awardDisplay.innerText = 'You got it!';
    awardDisplay.setAttribute('style', 'color: green;');
    awardDisplay.classList.remove('hide');
    scoreCount++;
    setTimeout(function() {
      awardDisplay.classList.add('hide');
    }, 2000);
  } else {
    awardDisplay.innerText = 'Survey says: Nnnnnope';
    awardDisplay.setAttribute('style', 'color: red;');
    awardDisplay.classList.remove('hide');
    timeCount -= 10;
    setTimeout(function() {
      awardDisplay.classList.add('hide');
    }, 3000);
  }
  currentQuestion++

  if (currentQuestion === questions.length) {
    endGame();
  }
  
}
}

function endGame() {
  clearInterval(timerInterval);
  questionsAnswers.classList.add('hide');
  submitScore.classList.remove('hide');

  let scoreCountNum = scoreCount;
  var scoreParsed = scoreCountNum.toString();
  userScore.textContent = scoreParsed;

  console.log(scoreCount);
  console.log(scoreParsed);

  joinLeaderboardBtn.addEventListener('click', records);
}

function records() {
  let scoreCountNum = scoreCount;
  var scoreParsed = scoreCountNum.toString();
  var history = JSON.parse(localStorage.getItem("history")) || [];
  var initials = userName.value;
  var newMemberScores = {initials, scoreParsed};
  var newMemberScoresIterables = JSON.stringify(newMemberScores);
  history.push(newMemberScores);
  localStorage.setItem("history", JSON.stringify(history));

  function writeRecords() {
    for (newMemberScoresIterable of newMemberScoresIterables) {
      var writeUser = document.createElement('p');
      var writeScore = document.createElement('p');
  
      writeUser.textContent = newMemberScoresIterables.initials;
      writeScore.textContent = newMemberScoresIterables.scoreCount;
    }
  }
  writeRecords();
  submitScore.classList.add('hide');
  leaderboardList.classList.remove('hide');
}

function viewRecords() {
  welcomeScr.classList.add('hide');
  questionsAnswers.classList.add('hide');
  submitScore.classList.add('hide');
  leaderboardList.classList.remove('hide');

  writeRecords();
}

choicesWrap.addEventListener('click', displayQuestion);
viewHighScores.addEventListener('click', viewRecords);
  