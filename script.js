const questions = [
  {
    question: "which is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },

  {
    question: "Who is father of our nation",
    answers: [
      { text: "Mahatma gandhi", correct: true },
      { text: "abraham lincoln", correct: false },
      { text: "Jawharlal nehru", correct: false },
      { text: "bheemrao ambedkar", correct: false },
    ],
  },

  {
    question: "How many colors does indian flag have",
    answers: [
      { text: "five", correct: false },
      { text: "three", correct: false },
      { text: "two", correct: false },
      { text: "four", correct: true },
    ],
  },

  {
    question: "Who was first prime minister of independent india",
    answers: [
      { text: "atal bihari bajpayee", correct: false },
      { text: "Javaharlal nehru", correct: true },
      { text: "Indira gandhi", correct: false },
      { text: "mohammad ali jinnah", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerelements = document.getElementById("answerbutton");
const nextbuttonvar = document.getElementById("nextbutton");

let currentquestionindex = 0;
let score = 0;

function startquiz() {
  currentquestionindex = 0;
  score = 0;
  nextbuttonvar.innerHTML = "Next";
  showquestion();
}

function showquestion() {
  resetstate();
  let currentQuestion = questions[currentquestionindex];
  let questionNo = currentquestionindex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerelements.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetstate() {
  nextbuttonvar.style.display = "none";
  while (answerelements.firstChild) {
    answerelements.removeChild(answerelements.firstChild);
  }
}

function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("incorrect");
  }
  Array.from(answerelements.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbuttonvar.style.display = "block";
}
function showScore() {
  resetstate();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextbuttonvar.innerHTML = "play again";
  nextbuttonvar.style.display = "block";
}
function handleNextButton() {
  currentquestionindex++;
  if (currentquestionindex < questions.length) {
    showquestion();
  } else {
    showScore();
  }
}

nextbuttonvar.addEventListener("click", () => {
  if (currentquestionindex < questions.length) {
    handleNextButton();
  } else {
    startquiz();
  }
});
startquiz();
