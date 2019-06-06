# TriviaGame

A JavaScript trivia game that uses JavaScript timing events for each question and jQuery to dynamically generate HTML.

How It Works:

The game shows only one question at a time, and the question is displayed until the player answers it or their time runs out.
If the player selects the correct answer, a screen is generated to congratulate them for choosing the right option. After a few seconds, the next question is displayed--without user input.
The scenario is similar for wrong answers and time-outs.
If the player runs out of time, the app tells the player that time is up, waits a few seconds, then shows the next question.
If the player chooses the wrong answer, the app tells the player they selected the wrong option, waits a few seconds, then shows the next question.
When there are no remaining questions, the final screen shows the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).