
// Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },

    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: "CSS"
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "int",
            "string",
            "let",
            "define"
        ],
        answer: "let"
    },

    {
        question: "Which method displays an alert box?",
        options: [
            "console.log()",
            "alert()",
            "document.write()",
            "prompt()"
        ],
        answer: "alert()"
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "<!-- -->",
            "##",
            "//",
            "**"
        ],
        answer: "//"
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let selectedAnswer = null;
let answered = false;

// Shuffle Questions
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [questions[i], questions[j]] =
        [questions[j], questions[i]];
    }
}

// Start Timer
function startTimer() {
    clearInterval(timer);

    timeLeft = 15;
    document.getElementById("timer").textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(true);
        }

    }, 1000);
}

// Display Question
function displayQuestion() {

    selectedAnswer = null;
    answered = false;

    const current = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        `Question: ${currentQuestion + 1}/${questions.length}`;

    document.getElementById("question").textContent =
        current.question;

    document.getElementById("feedback").textContent = "";

    const answerContainer =
        document.getElementById("answer-options");

    answerContainer.innerHTML = "";

    current.options.forEach(function (option) {

        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option-btn";

        button.onclick = function () {

            if (answered) return;

            selectedAnswer = option;

            document.querySelectorAll(".option-btn")
                .forEach(function (btn) {
                    btn.classList.remove("selected");
                });

            button.classList.add("selected");
        };

        answerContainer.appendChild(button);
    });

    document.getElementById("submit-btn").hidden = false;
    document.getElementById("next-btn").hidden = true;

    startTimer();
}

// Check Answer
function checkAnswer(timeUp = false) {

    if (answered) return;

    answered = true;
    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {

        score++;

        document.getElementById("feedback").textContent =
            "Correct! Well done!";

        document.getElementById("feedback").style.color = "green";

    } else {

        document.getElementById("feedback").textContent =
            timeUp
                ? "Time is up! Correct answer: " + correctAnswer
                : "Incorrect! Correct answer: " + correctAnswer;

        document.getElementById("feedback").style.color = "red";
    }

    document.querySelectorAll(".option-btn")
        .forEach(function (btn) {
            btn.disabled = true;
        });

    document.getElementById("submit-btn").hidden = true;
    document.getElementById("next-btn").hidden = false;

    document.getElementById("next-btn").textContent =
        currentQuestion === questions.length - 1
            ? "See Results"
            : "Next Question";
}

// Next Question
function nextQuestion() {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        displayQuestion();

    } else {

        showResult();
    }
}

// Show Final Result
function showResult() {

    clearInterval(timer);

    document.getElementById("quiz-section").hidden = true;

    document.getElementById("result-section").hidden = false;

    document.getElementById("final-score").textContent =
        `Your Score: ${score} / ${questions.length}`;
}

// Start Quiz
function startQuiz() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz-section").hidden = false;

    document.getElementById("result-section").hidden = true;

    document.getElementById("start-btn").hidden = true;

    shuffleQuestions();

    displayQuestion();
}
