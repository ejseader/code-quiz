var welcomeBtn = document.querySelector('#welcomeBtn');
var welcomeScr = document.querySelector('#welcomeScreen');
var quesAns = document.querySelector('#questionsAnswers');
var ansBtn = document.querySelectorAll('.ansBtn');
var question = document.querySelector('#question');
var answerChoices = document.querySelectorAll('#answers');
var ul = document.querySelector('ul');
// var answerOne = document.querySelector('#answerOne');
// var answerTwo = document.querySelector('#answerTwo');
// var answerThree = document.querySelector('#answerThree');
// var answerFour = document.querySelector('#answerFour');
var submitScore = document.querySelector('#endScreen');
var userScore = document.querySelector('#user-score');
var userNameInput;
var submitBtn = document.querySelector('.submitBtn');

var questionNumber = -1;
var answer;


welcomeBtn.addEventListener('click', function () {
    welcomeScr.setAttribute('style', 'display:none;');
    quesAns.setAttribute('style', 'display: block;');
    var timeLeft = document.querySelector('#timer');
    var count = 120;

    var timer = setInterval(function () {
        count--;
        timeLeft.innerText = 'Count: ' + count;

        if (count === 0) {
            clearInterval(timer);
        }
    }, 1000);
});

var questionDisplay = document.querySelector('#question');
var questions = [
    {
        ask: 'What does HTML stand for?',
        choices: [
            'Home Test Mastery Lexicon',
            'Hypertext Markup Language',
            "Harry Tries Mimi's Lasagna",
            'Hyperlinks and Textile Makeup Language'
        ],
        answerIndex: 1
    },
    {
        ask: 'Which of the following is NOT a CSS selector?',
        choices: [
            '#',
            '.',
            'body',
            '</html>'
        ],
        answerIndex: 3
    },
    {
        ask: 'Choose the correct HTML element for the largest heading:',
        choices: [
            '<h6>',
            '<head>',
            '<heading>',
            '<h1>'
        ],
        answerIndex: 3
    },
    {
        ask: 'What is the correct HTML for adding a background color?',
        choices: [
            '<body bg="yellow">',
            '<background>yellow</background>',
            '<body style="background-color:yellow;',
            '<background color="yl" />'
        ],
        answerIndex: 2
    },
    {
        ask: 'What is the correct syntax for creating a hyperlink?',
        choices: [
            '<a name="http://www.w3schools.com">W3Schools.com</a>',
            '<a>http://www.w3schools.com</a>',
            '<a href="http://www.w3schools.com">W3Schools.com</a>',
            '<a url="http://www.w3schools.com">W3Schools.com</a>'
        ],
        answerIndex: 3
    },
    {
        ask: 'What does CSS stand for?',
        choices: [
            'Computer Style Sheets',
            'Colorful Style Sheets',
            'Creative Style Sheets',
            'Cascading Style Sheets'
        ],
        answerIndex: 3
    },
    {
        ask: 'What is the correct CSS syntax for making all the <p> elements bold?',
        choices: [
            'p {font-weight:bold;}',
            '<p style="font-size:bold;">',
            '<p style="text-size:bold;">',
            'p {text-size:bold;}'
        ],
        answerIndex: 0
    },
    {
        ask: 'How do you make each word in a text start with a capital letter?',
        choices: [
            'transform:capitalize',
            'text-style:capitalize',
            'text-transform:capitalize',
            "You can't do that with CSS"
        ],
        answerIndex: 2
    },
    {
        ask: 'What is the correct JavaScript syntax to change the content of the HTML element below? \n <p id="demo">This is a demonstration,</p>',
        choices: [
            'document.getElementByName("p").innerHTML = "Hello World!"',
            'document.getElement("p").innerHTML = "Hello World!"',
            '#demo.innerHTML = "Hello World!"',
            'document.getElementById("demo").innerHTML = "Hello World!"'
        ],
        answerIndex: 3
    },
    {
        ask: 'How do you create a function in JavaScript',
        choices: [
            'function myFunction()',
            'function:myFunction()',
            'function = myFunction()',
            'function.create_myFunction()'
        ],
        answerIndex: 0
    }
];

// for (i = 0; i < questions.length; i++) {

// }

// question.innerText = questions[2].ask;
// answerOne.innerText = questions[2].choices[0];
// answerTwo.innerText = questions[2].choices[1];
// answerThree.innerText = questions[2].choices[2];
// answerFour.innerText = questions[2].choices[3];

function askQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answerIndex

    question.textContent = questions[questionNumber].ask;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "section button");
    }
}

// RECONFIGURE BELOW:

// display option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "FINAL SCORE: " + secondsLeft + ".";
}

// Event Listeners for Main Buttons
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // create a new object with name and score keys
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // check if there are scores in local storage first and take value
    //if not, make a blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push object into score array
    highScores.push(newScore)
    // turn objects into an array of strings + put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.style.display='none'
}

function showFeedback(){
    var pElement = document.getElementsByClassName("feedback")[0]
    pElement.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var pElement = document.getElementsByClassName("feedback")[0]
    
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent) {   
        pElement.innerHTML = "YES!";
        setTimeout(hideFeedback,1225);
        showFeedback();   
        
    } else {
        pElement.innerHTML = "WRONG.";
        setTimeout(hideFeedback,1225);
        secondsLeft = secondsLeft - 20;
        showFeedback();
    }    
    makeQuestions();
});