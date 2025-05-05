let questions = [];

async function startQuiz() {
    const selectedClass = document.getElementById("classSelect").value;
    const response = await fetch(`questions/${selectedClass}.json`);
    const data = await response.json();
  
    document.getElementById("quizForm").innerHTML = ""; // <-- Clear previous quiz
  
    const uniqueQuestions = Array.from(new Set(data.map(q => JSON.stringify(q)))).map(q => JSON.parse(q));
    questions = uniqueQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
  
    displayQuiz();
  }
  

function displayQuiz() {
  const quizForm = document.getElementById("quizForm");
  quizForm.innerHTML = "";
  quizForm.style.display = "block";
  document.getElementById("submitBtn").style.display = "block";

  questions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.options.forEach(option => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${index}" value="${option}"> ${option}`;
      optionsDiv.appendChild(label);
    });

    questionDiv.appendChild(optionsDiv);
    quizForm.appendChild(questionDiv);
  });
}

let submitted = false;

function submitQuiz() {
  if (submitted) {
    alert("You have already submitted the test.");
    return;
  }

  let score = 0;

  questions.forEach((q, i) => {
    const options = document.querySelectorAll(`input[name=q${i}]`);
    options.forEach(option => {
      option.disabled = true; // Lock all options after submission
    });

    const selected = document.querySelector(`input[name=q${i}]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("result").textContent = `You scored ${score} out of 10.`;

  document.getElementById("submitBtn").disabled = true; // Disable submit button
  submitted = true;
}
