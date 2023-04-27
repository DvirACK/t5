const questionsData = [
  
    {
        question: "Which artist is famous for painting the 'Mona Lisa'?",
        options: {
            a: "Vincent van Gogh",
            b: "Leonardo da Vinci",
            c: "Pablo Picasso"
        },
        correctOption: "b"
    },
    {
        question: "What is the name of the style of art created by artists like Monet, Renoir, and Degas?",
        options: {
            a: "Cubism",
            b: "Impressionism",
            c: "Surrealism"
        },
        correctOption: "b"
    },
    {
        question: "Which artist is known for his 'Starry Night' painting?",
        options: {
            a: "Vincent van Gogh",
            b: "Pablo Picasso",
            c: "Salvador Dalí"
        },
        correctOption: "a"
    },
    {
        question: "Which artist is famous for the painting 'The Persistence of Memory'?",
        options: {
            a: "Vincent van Gogh",
            b: "Pablo Picasso",
            c: "Salvador Dalí"
        },
        correctOption: "c"
    },
    {
        question: "Which artist is famous for the creation of the 'David' statue?",
        options: {
            a: "Michelangelo",
            b: "Leonardo da Vinci",
            c: "Donatello"
        },
        correctOption: "a"
    },
    {
        question: "Which art movement is characterized by bold colors, strong lines, and simple shapes?",
        options: {
            a: "Fauvism",
            b: "Abstract Expressionism",
            c: "Cubism"
        },
        correctOption: "a"
    },
    {
        question: "Which artist is known for creating 'Campbell's Soup Cans'?",
        options: {
            a: "Andy Warhol",
            b: "Roy Lichtenstein",
            c: "Keith Haring"
        },
        correctOption: "a"
    },
    {
        question: "What famous painting did Edvard Munch create?",
        options: {
            a: "The Scream",
            b: "The Last Supper",
            c: "The Girl with a Pearl Earring"
        },
        correctOption: "a"
    },
    {
        question: "Which famous artist cut off part of his own ear?",
        options: {
            a: "Vincent van Gogh",
            b: "Paul Gauguin",
            c: "Pablo Picasso"
        },
        correctOption: "a"
    },
    {
        question: "Who painted 'American Gothic'?",
        options: {
            a: "Edward Hopper",
            b: "Grant Wood",
            c: "Norman Rockwell"
        },
        correctOption: "b"
    },
];






class TriviaGame {
    constructor(questionsData) {
        this.questionsData = questionsData;
        this.currentQuestionIndex = 0;
        this.correctAnswers = 0;
        this.totalPoints = 0;
        this.timer = null;
        this.timeRemaining = 10;
        this.avgTimePerQuestion = 0;
    }

    // Add methods here

    // ... (constructor and properties)

    startGame() {
        this.showGameScreen();
        this.showNextQuestion();
    }

    showGameScreen() {
        document.querySelector('.intro-screen').hidden = true;
        document.querySelector('.game-screen').hidden = false;
    }

    showNextQuestion() {
        if (this.currentQuestionIndex < this.questionsData.length) {
            const questionData = this.questionsData[this.currentQuestionIndex];
            document.querySelector('.question').textContent = questionData.question;
            const answerButtons = document.querySelectorAll('.answer-btn');
            answerButtons.forEach((button, index) => {
                const option = String.fromCharCode(97 + index); // Convert 0, 1, 2 to 'a', 'b', 'c'
                button.textContent = questionData.options[option];
                button.dataset.correct = option === questionData.correctOption;
            });
            this.resetTimer();
            this.startTimer();
        } else {
            this.showSummaryScreen();
        }
    }

    showSummaryScreen() {
        this.stopTimer();
        document.querySelector('.game-screen').hidden = true;
        document.querySelector('.summary-screen').hidden = false;
        document.querySelector('.correct-answer-count').textContent = this.correctAnswers;
        document.querySelector('.total-points').textContent = this.totalPoints;
        document.querySelector('.avg-time-per-question').textContent = (this.avgTimePerQuestion / this.questionsData.length).toFixed(2);
    }

    // Add more methods here

    // ... (constructor, properties, and other methods)

    resetTimer() {
        this.timeRemaining = 10;
        this.updateProgressBar();
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateProgressBar();
            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.processAnswer(null);
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    updateProgressBar() {
        document.querySelector('.timer-progress').style.width = `${(this.timeRemaining / 10) * 100}%`;
    }

    processAnswer(isCorrect) {
        this.stopTimer();
        this.avgTimePerQuestion += 10 - this.timeRemaining;

        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((button) => {
            const buttonIsCorrect = button.dataset.correct === "true";

            if (button.classList.contains('pressed')) {
                if (isCorrect) {
                    button.classList.add('correct');
                } else {
                    button.classList.add('incorrect');
                }
                button.disabled = true;
            }
        });

        // Find and highlight the correct answer
        const correctButton = Array.from(answerButtons).find(
            (btn) => btn.dataset.correct === "true"
        );
        correctButton.classList.add('correct');
        correctButton.disabled = true;

        if (isCorrect) {
            this.correctAnswers++;
            this.totalPoints += 10 + (2 * this.timeRemaining);
            document.querySelector('.score').textContent = `Score: ${this.totalPoints}`; // Update the score after every correct answer
        }

        setTimeout(() => {
            answerButtons.forEach((button) => {
                button.classList.remove('correct', 'incorrect');
                button.disabled = false;
            });

            this.currentQuestionIndex++;
            this.showNextQuestion();
        }, 2000);
    }





}

// end of game
//starts listenrs

document.querySelector('.start-btn').addEventListener('click', () => {
    const game = new TriviaGame(questionsData);
    game.startGame();

    document.querySelectorAll('.answer-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const button = event.target;
            button.classList.add('pressed');

            setTimeout(() => {
                button.classList.remove('pressed');
                const isCorrect = button.dataset.correct === "true";
                game.processAnswer(isCorrect);
            }, 750);
        });
    });

});

document.querySelector('.share-btn').addEventListener('click', () => {
    const shareText = `I scored ${document.querySelector('.total-points').textContent} points in the Trivia Game! Can you beat my score?`;
    const shareUrl = 'https://www.gptpuzzle.com/blog/categories/trivia';

    if (navigator.share) {
        navigator.share({
            title: 'Trivia Game',
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback for browsers that don't support the Web Share API
        prompt('Copy the link below to share the game:', shareUrl);
    }
});


