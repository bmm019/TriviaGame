// Display time remaining

// Display question and answer choices

// If the play chooses the right answer, display congrats screen 

// If the player runs out of time, tell the player that time's up and display the correct answer. 

// Wait a few seconds, then show the next question.

// If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. 

// Wait a few seconds, then show the next question.

// Have final screen to show how user did on the game
// Option to restart the game 


$(document).ready(function() {

	var startScreen;
	var gameHTML;
	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var questionCounter = 0;
	var counter = 20;
	var clock;
	var questionArray = [
		{ 	
			question: "Which of the actors on Friends unfortunately decides to whiten his teeth before going out on a first date with a girl he's had a crush on for some time?",
			answers: [
				{text: "Ross", isCorrect: true},
				{text: "Chandler", isCorrect: false},
				{text: "Joey", isCorrect: false},
				{text: "Gunther", isCorrect: false}
			]
		},
		{	
			question: "Who was Ross's second wife?",
			answers: [
				{text: "Monica", isCorrect: false},
				{text: "Emily", isCorrect: true},
                {text: "Phoebe", isCorrect: false},
                {text: "Rachel", isCorrect: false},
			]
		},
		{
			question: "Whose favorite food is sandwhiches?",
			answers: [
				{text: "Ross", isCorrect: false},
				{text: "Joey", isCorrect: true},
                {text: "Chandler", isCorrect: false},
                {text: "Phoebe", isCorrect: false}
			]
		},
		{ 
			question: "What is the name of Chander's annoying ex-girlfriend?",
			answers: [
				{text: "Lisa", isCorrect: false},
				{text: "Monica", isCorrect: false},
				{text: "Amy", isCorrect: false},
				{text: "Janice", isCorrect: true}
			]
		},
		{
			question: "Who had an on and off addiction to smoking?",
			answers: [
				{text: "Chandler", isCorrect: true},
                {text: "Ross", isCorrect: false},
                {text: "Phoebe", isCorrect: false},
                {text: "Joey", isCorrect: false}
			]
		},
		

	];

	
	function generateHTML() {
		var timeRemainingText = "<p class='timerText text-center'>Time Remaining: <span id='timer'>20</span></p>";
		var questionText = "<p class='questionText text-center'>" + questionArray[questionCounter].question + "</p>";
		gameHTML = timeRemainingText + questionText;
		$(".mainArea").html(gameHTML);
		for (var i = 0; i < questionArray[questionCounter].answers.length; i++) {
			var answerButton = $("<button>");
			answerButton.addClass("answer btn btn-block text-center");
			answerButton.attr("isCorrect", questionArray[questionCounter].answers[i].isCorrect);
			answerButton.html(questionArray[questionCounter].answers[i].text);
			$(".mainArea").append(answerButton);
		}
	}

	function generateWin() {
		correct++;
		var correctAnswerText = "<p class='correctText text-center'>CORRECT!</p>";
		var imgHTML = "<img class='center-block imgCorrect' src='assets/images/1180px-Checkmark_green.svg 2.png'>";
		gameHTML = correctAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function generateLoss() {
		incorrect++;
		var wrongAnswerText = "<p class='wrongText text-center'>INCORRECT</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/x.png'>";
		gameHTML = wrongAnswerText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000); 
	}

	function generateLossAtTimeOut() {
		unanswered++;
		var timeOutText = "<p class='timeOutText text-center'>TIME'S UP!</p>";
		var imgHTML = "<img class='center-block imgWrong' src='assets/images/x.png'>";
		gameHTML =  timeOutText + imgHTML;
		$(".mainArea").html(gameHTML);
		setTimeout(nextDisplay, 3000);  
	}

	function timer() {
		clock = setInterval(twentySeconds, 1000);
		function twentySeconds() {
			if (counter === 0) {
				clearInterval(clock);
				generateLossAtTimeOut();
			} else if (counter > 0) {
				counter--;
			}
			$("#timer").html(counter);
		}
	}

	// function that generates html for the next screen, increments the question counter, and resets timer
	function nextDisplay() {
		if (questionCounter < questionArray.length - 1) {
			questionCounter++;
			generateHTML();
			counter = 20;
			timer();
		} else {
			finalScreen();
		}
	}

	function finalScreen() {
		var finishedText = "<p class='finishedText text-center'>Final Score!</p>";
		var summaryCorrectHTML = "<p class='summaryCorrect text-center'>Correct Answers: " + correct + "</p>";
		var summaryWrongHTML = "<p class='summaryWrong text-center'>Wrong Answers: " + incorrect + "</p>";
		var summaryUnansweredHTML = "<p class='summaryUnanswered text-center'>Unanswered: " + unanswered + "</p>";
		var resetButtonHTML = "<button class='resetButton btn btn-primary btn-lg btn-block text-center' type='button'>PLAY AGAIN</button>";
		gameHTML = finishedText + summaryCorrectHTML + summaryWrongHTML + summaryUnansweredHTML + resetButtonHTML;
		$(".mainArea").html(gameHTML);
	}

	function resetGame() {
		questionCounter = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
		counter = 20;
		generateHTML();
		timer();
	}

	// Function that creates the start button and initial screen
	function initialScreen() {
		var initialText = "<p class='initialText text-center'>Test your knowledge of FRIENDS!</p> <p class='initialText text-center'>There are 5 questions total and you will have 20 seconds to answer each one. Good luck!</p>";
		var startButtonHTML = "<button class='startButton btn btn-primary btn-lg btn-block text-center' type='button'>Start Quiz</button>";
		startScreen = initialText + startButtonHTML;
		$(".mainArea").html(startScreen);
	}

	// When the start button is clicked:
	$("body").on("click", ".startButton", function(){ 
		generateHTML();
		timer();
	});

	// When an answer is clicked:
	$("body").on("click", ".answer", function(){
		selectedAnswer = $(this).attr("isCorrect");
		console.log(selectedAnswer);

		if (selectedAnswer === "true") { // evaluates if this is the correct answer
			clearInterval(clock);
		 	generateWin();
		} else { 	// then it's the wrong answer
			clearInterval(clock);
			generateLoss();
		}

	}); 

	// When the Play Again button is clicked:
	$("body").on("click", ".resetButton", function(){
		resetGame();
	}); 

	initialScreen();

});  