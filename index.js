const questions = [
  {
    type: "multiple",
    question: "Which of the following programming language is commonly used for client side scripting in web development ?",
    options: ["Python", "JavaScript", "HTML", "PHP"],
    answer: "JavaScript"
  },
  {
    type: "multiple",
    question: "Which of the following programming language is commonly used for server side scripting in web development ?",
    options: ["Python", "Java", "HTML", "PHP"],
    answer: "PHP"
  },
  {
    type: "truefalse",
    question: "HTML 5.0 is latest standard.",
    options: ["True", "False"],
    answer: "True"
  },
{
    type: "truefalse",
    question: "CSS is used for styling web pages.",
    options: ["True", "False"],
    answer: "True"
  },
  
  {
    type: "fillblank",
    question: "The element________ used to establish base URL.",
    options: ["BASE element", "HEAD element", "both", "Attribute Element"],
    answer: "BASE element"
  },

  {
    type: "multipleSelect",
    question: "Select all JavaScript frameworks:",
    options: ["React", "Django", "Angular", "Laravel"],
    answer: ["React", "Angular"]
  },
  {
    type: "fillblank",
    question: "Page design in HTML is called ________ .",
    options: ["Yellow page", "Web page", "Front page", "Attribute page"],
    answer: "Web page"
  },
  {
    type: "multiple",
    question: "Which of the software can read and render HTML document ?",
    options: ["Compiler", "Browser", "None", "Both"],
    answer: "Browser"
  },
  {
    type: "truefalse",
    question: "HTML is used for structuring web page  .",
    options: ["True", "False"],
    answer: "True"
  },
  {
    type: "multiple",
    question: "Basic fundamental block is called?",
    options: ["HTML body ", "HTML attribute", "HTML element", "HTML tag"],
    answer: "HTML tag"
  },
  
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const quizBox = document.getElementById("box");
const nextBtn = document.getElementById("btn");
const resultBox = document.getElementById("result");
const scoreDisplay = document.getElementById("score");

function loadQuestion() {
  const q = questions[currentQuestion];
  quizBox.innerHTML = `<p><strong>Q${currentQuestion + 1}:</strong> ${q.question}</p>`;

  if (q.type === "multiple" || q.type === "truefalse" || q.type === "fillblank") {
    q.options.forEach(opt => {
      quizBox.innerHTML += `
        <label><input type="radio" name="answer" value="${opt}"> ${opt}</label>`;
    });
  } else if (q.type === "multipleSelect") {
    q.options.forEach(opt => {
      quizBox.innerHTML += `
        <label><input type="checkbox" name="answer" value="${opt}"> ${opt}</label>`;
    });
  }
}

nextBtn.addEventListener("click", () => {
  const q = questions[currentQuestion];
  let selected = [];

  if (q.type === "multiple" || q.type === "truefalse" || q.type === "fillblank") {
    const selectedInput = document.querySelector('input[name="answer"]:checked');
    if (selectedInput) {
      selected = selectedInput.value;
    } else {
      alert("Please select an answer.");
      return;
    }
  }

  if (q.type === "multipleSelect") {
    const selectedCheckboxes = document.querySelectorAll('input[name="answer"]:checked');
    if (selectedCheckboxes.length === 0) {
      alert("Please select at least one option.");
      return;
    }
    selected = Array.from(selectedCheckboxes).map(cb => cb.value);
  }

  const isCorrect = checkAnswer(selected, q.answer);
  if (isCorrect) score++;

  userAnswers.push({
    question: q.question,
    type: q.type,
    selected,
    correctAnswer: q.answer,
    isCorrect
  });

  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function checkAnswer(selected, correct) {
  if (Array.isArray(correct)) {
    return (
      Array.isArray(selected) &&
      correct.length === selected.length &&
      correct.every(val => selected.includes(val))
    );
  }
  return selected === correct;
}

function showResult() {
  quizBox.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultBox.classList.remove("hidden");

  scoreDisplay.textContent = `${score} / ${questions.length}`;

  
  userAnswers.forEach((ans, index) => {
    if (!ans.isCorrect) {
      const div = document.createElement("div");
      div.classList.add("review");

      const userAnswerText = Array.isArray(ans.selected) ? ans.selected.join(", ") : ans.selected;
      const correctAnswerText = Array.isArray(ans.correctAnswer) ? ans.correctAnswer.join(", ") : ans.correctAnswer;

      div.innerHTML = `
        <hr>
        <p><strong>Q${index + 1}: ${ans.question}</strong></p>
        <p style="color:blue;">Your Answer: ${userAnswerText}</p>
        <p style="color:aquagray;">Correct Answer: ${correctAnswerText}</p>
      `;
      resultBox.appendChild(div);
    }
  });
}


loadQuestion();
