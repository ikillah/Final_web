const questions = [
    {
        question: "Khan, under whom the cities of Syr Darya and the city of Tashkent finally became part of the Kazakh state for 200 years",
        answers: [
            {text: "Tahir", correct: false},
            {text: "Esim", correct: true},
            {text: "Kasym", correct: false},
            {text: "Abylai", correct: false},
        ]
    },
    {
        question: "In what year did Kazakhstan become a member of the UN?",
        answers: [
            { text: "1993", correct: false},
            {text: "1991", correct: false},
            {text: "1992", correct: true},
            {text: "1994", correct: false},
        ]
    },
    {
        question: "What event led to the final establishment of Russian power on the territory of modern Kazakhstan?",
        answers: [
            {text: "Russian-Turkish War", correct: false},
            {text: "The Fall of the Kokand Khanate", correct: true},
            {text: "The Pugachev Uprising", correct: false},
            {text: "Publication of the manifesto on the liberties of the nobility", correct: false},
        ]
    },
    {
        question: "Abylai was recognized as Khan by representatives of all three Kazakh zhuzes in",
        answers: [
            {text: "1771", correct: true},
            {text: "1756", correct: false},
            {text: "1762", correct: false},
            {text: "1778", correct: false},
        ]
    },
    {
        question: "The city of Southern Kazakhstan, which survived the invasion of the Dzungars at the end of the XVII century",
        answers: [
            {text: "Turkestan", correct: true},
            {text: "Taraz", correct: false},
            {text: "Otrar", correct: false},
            {text: "Syganak", correct: false},
        ]
    },
    {
        question: "Khan of the younger Zhuz, who fought against the Dzungars",
        answers: [
            {text: "Karatai", correct: false},
            {text: "Bokei", correct: false},
            {text: "Abulgazy", correct: false},
            {text: "Abulkhair", correct: true},
        ]
    },
    {
        question: "When was the Alash party created?",
        answers: [
            {text: "1916", correct: false},
            {text: "1917", correct: true},
            {text: "1919", correct: false},
            {text: "1920", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();