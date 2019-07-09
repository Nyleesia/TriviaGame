// Provides all the questions and answers in the form of an object
let trivia = {
	questions: {
		theJetsons: {
			cartoon: 'The Jetsons',
			a1: 'Jim Jetson',
			a2: 'George Jetson',
			a3: 'Will Jetson',
			a4: 'Walter Jetson',
			correct: 'a2',
			image: 'assets/images/jetson-george.jpg',
		},

		americanDad: {
			cartoon: 'American Dad',
			a1: 'Frank Smith',
			a2: 'Roger Smith',
			a3: 'Steve Smith',
			a4: 'Stan Smith',
			correct: 'a4',
			image: 'assets/images/smith-stan.png',
		},

		theIncredibles: {
			cartoon: 'The Incredibles',
			a1: 'Bob Parr',
			a2: 'Will Parr',
			a3: 'James Parr',
			a4: 'Tyler Parr',
			correct: 'a1',
			image: 'assets/images/mr-incredible.jpg',
		},

		bobsBurgers: {
			cartoon: "Bob's Burgers",
			a1: 'Bill Sure',
			a2: 'Bob Welsher',
			a3: 'Bob Belcher',
			a4: 'Bob Belsure',
			correct: 'a3',
			image: 'assets/images/belcher-bob.jpg',
		},

		familyGuy: {
			cartoon: 'Family Guy',
			a1: 'Stewie Griffin',
			a2: 'Bryan Griffin',
			a3: 'Pea Tear Griffyon',
			a4: 'Peter Griffin',
			correct: 'a4',
			image: 'assets/images/griffin-peter.png',
		},
        rickAndMorty1: {
            cartoon: "Rick and Morty",
            a1: 'Jerry Sanchez',
            a2: 'Jerry Smith',
            a3: 'Stan Smith',
            a4: 'Walter Sanchez',
            correct: 'a2',
            image: " assets/images/smith-jerry.jpg"
        },
        
		rickAndMorty2: {
            cartoon: "Rick and Morty",
            a1: 'Jerry Sanchez',
            a2: 'Rick Smith',
            a3: 'Rick Sanchez',
            a4: 'Clancy Wiggums',
			correct: 'a3',
            image: " assets/images/sanchez-rick.png",
		},

		theSimpsons1: {
            cartoon: "The Simpsons",
            a1: 'Jim Jetson',
			a2: 'George Jetson',
			a3: 'Homer Simpson',
			a4: 'Walter Jetson',
			correct: 'a3',
            image: "assets/images/simpson-homer.png",
			},

        theSimpsons2: {
            cartoon: "The Simpsons",
            a1: 'Barney Rubble',
            a2: 'Clancy Wiggums',
            a3: 'Selma Bouvier',
            a4: 'Moe Bouvier',
            correct: 'a2',
            image: "assets/images/wiggum-clancy.png",
            },

		theSimpsons3: {
            cartoon: "The Simpsons",
            a1: 'Bert Simpson',
			a2: 'Ned Flanders',
			a3: 'Homer Morrison',
			a4: 'Staniel Wiggums',
			correct: 'a2',
            image: "assets/images/flanders-ned.jpg",
     }
    }
};

function exit(){
    window.close(this);
}

// Variable for sound
let audio = new Audio('assets/audio/Booba-Game-Over.mp3');
audio.volume = 0.20;
audio.loop = true;

document.addEventListener('click', function (event) {

    if (event.target.matches('#start')){
       if (audio.paused == true) {
            audio.play();
        }
        else {
            audio.pause();
        };
    };
    });

// Activates the sound by using a dynamicly created button 
document.addEventListener('click', function (event) {

if (event.target.matches('#soundBtn')){
   if (audio.paused == true) {
        audio.play();
    }
    else {
        audio.pause();
    };
};
});

// Makes the list of dads in the object above a variable "questionList"
let questionList = [
	trivia.questions.americanDad,
	trivia.questions.theJetsons,
	trivia.questions.theIncredibles,
	trivia.questions.bobsBurgers,
    trivia.questions.theSimpsons1,
    trivia.questions.theSimpsons2,
    trivia.questions.theSimpsons3,
    trivia.questions.rickAndMorty1,
    trivia.questions.rickAndMorty2,
    trivia.questions.familyGuy,
];

let questions = [];

// Randomly sorts questions
while (questions.length < questionList.length) {
	var qPos = Math.floor(Math.random() * questionList.length);
	if ($.inArray(questionList[qPos], questions) !== -1) {
		continue;
	}
	questions.push(questionList[qPos]);
}

// Sets timer to 21 seconds so users see 20
var time = 21;

// Initialises other variables
var timer;
var resetTimer;
var endTimer;
var questionTimer;
var currentQuestionPos = 0;
var currentQuestion = questions[0];
var correctAnswerNum = 0;
var noAnswerNum = 0;
var incorrectAnswerNum = 0;

// Start of document ready----------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
     // Sets an automatic restart function
	function restart() {
		currentQuestionPos = 0;
		currentQuestion = questions[0];

		correctAnswerNum = 0;
		noAnswerNum = 0;
		incorrectAnswerNum = 0;

        $('#timer').empty();
        $('#timer').hide();
		$('#gameContainer').empty();
		$('#gameContainer').html(`<button id="start"> Start Game </button>`);
		$('#start').off('click');
        $('#start').click(startGame);
        
    }
    
    function reset() {
        timer.stop();
        clearTimeout(resetTimer);
        clearTimeout(endTimer);
        clearTimeout(questionTimer);
        restart();
    }

	
    // Creates the timer function and resets it at the start of each question
	function Timer(fn, t) {
		var timerVar = setInterval(fn, t);

		(this.stop = function() {
			if (timerVar) {
				clearInterval(timerVar);
				timerVar = null;
			}
			return this;
		}),
			// Starts timer using current settings (if it's not already running)
			(this.start = function() {
				if (!timerVar) {
					this.stop();
					timerVar = setInterval(fn, t);
				}
				return this;
			}),
			// start with new interval, stop current interval
			(this.reset = function(newTime) {
				t = newTime;
				return this.stop().start();
			});
    }
    
  
    restart();
    
    function endGame() {
        $('#timer').empty();
        $('#gameContainer').html(`<ul><h1><li class="res"> Correct: ${correctAnswerNum}</li>
                                        <li class="res"> Incorrect: ${incorrectAnswerNum}</li>
                                        <li class="res"> No Answer: ${noAnswerNum}</li></h1></ul>`);
        
        $("#gameContainer").append(`<button class= "resetBtn" id="pa">Play Again</button>`)
        $(".resetBtn").click(reset);
        $("#timer").hide();
        resetTimer = setTimeout(restart, 10000);
    }   

    // Adds to tht DOM, the questions in the object above, using the question variable...
	function getNextQuestion(status) {
        timer.stop();
		$('#gameContainer').empty();
        currentQuestionPos += 1;


        let counter = 4;
        let interval = setInterval(function() {
            counter--;
        let nextQ = `Next question in: ${counter} seconds`;
        $("#nextIn").html(`<div id="nextQ">${nextQ}</div>`);
        if (counter > 0) {
            return; 
        }
        else{
            clearInterval(interval);
        }
        }, 1000);
                   
        
		if (status == 'correct') {
            correctAnswerNum += 1;
			$('#gameContainer').html(`<ul><li class="resps"><h1>Correct!</h1></li>
                                    <li><img style="width:150px;height:150px" 
                                    src=${currentQuestion.image}></li>
                                    <li class="rev">${currentQuestion[currentQuestion.correct]}</li></ul>`);
           $(".jumbotron").append(`<div id="nextIn"></div>`);
           
        }

		if (status == 'incorrect') {
			incorrectAnswerNum += 1;
			$('#gameContainer').html(`<ul><li class="resps"><h1>Incorrect!</h1></li>
                                    <li><img style="width:150px;height:150px" 
                                    src=${currentQuestion.image}></li>
                                    <li class="rev">The correct answer was: ${currentQuestion[currentQuestion.correct]}</ul>`);
            $('.jumbotron').append(`<div id="nextIn"></div>`);
        }

		if (status == 'timeout') {
            noAnswerNum += 1;
            $('#gameContainer').html(`<ul><li class="resps"><h1>Time's Up!</h1></li>
                                    <li><img style="width:150px;height:150px" 
                                    src=${currentQuestion.image}></li>
                                    <li class="rev">The correct answer was: ${currentQuestion[currentQuestion.correct]}</ul>`);
                                    $('.jumbotron').append(`<div id="nextIn"></div>`);
                                    }

        if (currentQuestionPos >= questions.length) {
            // End of game
            endTimer = setTimeout(endGame, 3000);
			return;
        }
        

	
		currentQuestion = questions[currentQuestionPos];

        questionTimer = setTimeout(setupQuestion, 4000);
    }

	function countDown() {
		time -= 1;
		$('#timer').html(`<div id= "countdown"> Time Remaining:  ${time} seconds</div>`);
    
        if (time < 1) {
            getNextQuestion('timeout');
            return;
        }
    }

	function checkAnswer() {
		if ($(this).attr('id') == currentQuestion.correct) {
			getNextQuestion('correct');
			return;
		}

		getNextQuestion('incorrect');
    }
    
	function setupQuestion() {
        $('#timer').fadeIn("slow");
        // Saves the question that this trivia game is based on
        let prompt = `Which of the following is a dad on "${currentQuestion.cartoon}"?`;
		time = 21;
		timer.start();
		$('#gameContainer').empty();
		$('#gameContainer').html('<ul class="trivia"></ul>');
        $('#gameContainer ul').append(`<li id="prompter" > ${prompt}</li>
                                        <div id="options">
                                        <li> <button id="a1" class="answer btn">${ currentQuestion.a1}</li>
                                        <li> <button id="a2" class="answer btn">${ currentQuestion.a2}</li>
                                        <li> <button id="a3" class="answer btn">${ currentQuestion.a3}</li>
                                        <li> <button id="a4" class="answer btn">${ currentQuestion.a4}</li>
                                        </div>`);

		$('.answer').off('click');
        $('.answer').click(checkAnswer);

        $("#gameContainer").append(`<div class="container-wrap-wrap" id="BTNS">
                                    <div id= "main"><button class="btn" id="soundBtn">Sound (On/Off)</button>
                                    <button class="btn resetBtn">Reset </button>
                                    <button class="btn quitBtn">End Game</button></div>                                    
                                    <div id="exit"><button class="btn exitBtn">Exit(Close Page)</button></div>
                                    </div>`);

        $(".resetBtn").click(reset);
        $(".quitBtn").click(reset);  
        $(".exitBtn").click(exit);                             
    }

	function startGame() {
        timer=null;
		timer = new Timer(countDown, 1000);
        setupQuestion();
        
    }
   
}); // End of document ready
