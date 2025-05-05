// 1. Setup variables
let currentQuestion = 0;
let score= 0;
let timer;
let timeLeft = 5;
let playerName = "";

// 2. Get DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const nameInput = document.getElementById('name-input');
const finalMessage = document.getElementById('final-message');
const startBtn = document.getElementById('start-btn');
const playerNameDisplay = document.getElementById('player-name');

// 3. Sample quiz data
const quizData = [
    {
        question: " What is the meaning of 'Apple'?",
        choices: ["Pisang", "Apel", "Mangga", "Jeruk"],
        answer: "Apel"
    },
    {
        question: " What is the meaning of 'Short'?",
        choices: ["Tinggi", "Kecil", "Banyak", "Pendek"],
        answer: "Pendek" 
    },
    {
        question: " What is the meaning of 'Mother'?",
        choices: ["Ibu", "Nenek", "Ayah", "Tante"],
        answer: "Ibu"
    },
    {
        question: " My Father...coffe every morning",
        choices: ["Eat", "Drinks", "Drank", "Drunk"],
        answer: "Drinks"
    },
    {
        question: " I ...football with my friends every afternoon",
        choices: ["Play", "Played", "Player", "Place"],
        answer: "Play"
    }, 
    {
        question: "What is this '🌞'?",
        choices: ["Sun", "Moon", "Sky", "Tree"],
        answer: "Sun"
    },
    {
        question: "What is this '🥚'?",
        choices: ["Chicken", "Egg", "Duck", "Cow"],
        answer: "Egg"
    },
    {
        question: " 'Saya suka sayur-sayuran'In English is?",
        choices: ["I like Fruits", "I like Banana", "I like Vegetables", "I like Milk"],
        answer: "I like Vegetables"
    },
    {
        question: "I ... to the beach yesterday?",
        choices: ["Go", "Gone", "Goes", "Went"],
        answer: "Went"
    },
    {
        question: "How many dolls are there?🧸🧸🧸",
        choices: ["Two", "Four", "Three", "One"],
        answer: "Three"
    },
    {
        question: "My father is policeman. Policeman is...?",
        choices: ["Polisi", "Dokter", "Guru", "Perawat"],
        answer: "Polisi"  
    },
    {
        question: " 23 in English is...?",
        choices: ["Two","Twenty", "Twelve", "Twenty three"],
        answer: "Twenty three"  
    },
    {
        question: "Good morning is...?",
        choices: ["Selamat Malam", "Selamat Pagi", "Selamat Tidur", "Selamat Siang"],
        answer: "Selamat Pagi"  
    },
    {
        question: "How many cars are there? 🚗🚗🚗🚗🚗",
        choices: ["Five", "Four", "Seven", "Two"],
        answer: "Five"  
    },
    {
        question: "They...making cake right now",
        choices: ["is", "are", "am", "it"],
        answer: "are" 
    },
    {
        question: "He...to the gym last week",
        choices: ["went", "go", "goas", "gone"],
        answer: "went" 
    },
    {
        question: "She...her homework every day efter school",
        choices: ["did", "does", "do", "done"],
        answer: "does" 
    },
    {
        question: "What is the past form of 'can'?",
        choices: ["Could", "May mot", "Can't", "Can not"],
        answer: "Could" 
    },
    {
        question: "What is the meaning of 'Smart'",
        choices: ["Pintar", "Cerdas", "Bagus", "Happy"],
        answer: "Pintar" 
    },
    {
        question: "I...tennis every sunday morning",
        choices: ["Playing", "Play", "Plays", "am play"],
        answer: "Play" 
    },
    {
        question: "What is this '🦀'?",
        choices: ["Fish", "Crab", "Cow", "Bird"],
        answer: "Crab" 
    },
    {
        question: "Tomorrow artinya apa?",
        choices: ["Besok", "Sekarang", "Kemarin", "Hari ini"],
        answer: "Besok" 
    },
    {
        question: "Yesterday artinya apa?",
        choices: ["Besok", "Sekarang", "Kemarin", "Malam ini"],
        answer: "Kemarin"  
    },
    {
        question: "My name...Salsa",
        choices: ["it", "is", "are", "was"],
        answer: "is" 
    },
    {
        question: "He...new handphone last week",
        choices: ["Buy", "Bought", "Do", "Got"],
        answer: "Bought" 
    },
    {
        question: "She will go to Bali next month. What is the tenses?",
        choices: ["Future", "Past", "Present", "Present Continous"],
        answer: "Future"
    },
    {
        question: "Choose the correct past tense of 'eat'",
        choices: ["Eating", "Ate", "Eaten", "Eats"],
        answer: "Ate"
    },
    {
        question: "Which word is a noun?",
        choices: ["Jump", "Bright", "Child", "Buy"],
        answer: "Child"
    },
    {
        question: "Which word is a verb?",
        choices: ["Class", "Bright", "Child", "Box"],
        answer: "Bring"
    },
    {
        question: "What is this 🥥 ?",
        choices: ["Manggo", "Pear", "Coconut", "Banana"],
        answer: "Coconut"
    }
];

// Fungsi untuk mengacak array
function shuffleArray(array) {
    for (let i =array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 4. Start button event
startBtn.addEventListener(`click`, () => {
    playerName = nameInput.value.trim();
    if (!playerName) return alert("Please enter your name!");

    shuffleArray(quizData);  // Acak semua soal
    quizData.splice(10);     // Potong jadi 10 soal pertama

    startScreen.style.display = 'none';
    quizScreen.style.display = "block";
    playerNameDisplay.textContent = `Good Luck, ${playerName}!`;
    loadQuestion();
});

// 5. Load q question
function loadQuestion() {
    resetState();
    startTimer();

    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;

    currentQuiz.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.addEventListener('click', selectAnswer);
        choicesElement.appendChild(button);
    });

    scoreElement.textContent = `Score: ${score}`;
}

// 6. Reset and Timer
function resetState() {
    clearInterval(timer) ;
    timeLeft= 5;
    timerElement.textContent = `Time: ${timeLeft}`;
    choicesElement.innerHTML = '';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft ===0) {
            clearInterval(timer);
            showCorrectAndNext();
        }
    }, 1000);
}

// 7. Select Answer
function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const selectedChoice = selectedButton.textContent;
    const correctAnswer = quizData[currentQuestion].answer;

    const buttons = choicesElement.querySelectorAll('button');

    if (selectedChoice === correctAnswer) {
        selectedButton.classList.add('correct');
        score++;
        e.target.style.background = "#2ecc71";
    } else {
        e.target.style.background = "#e74c3c";
        selectedButton.classList.add('wrong');
        buttons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    buttons.forEach(btn => btn.disabled = true);

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// 8. Show correct answer when time runs out
function showCorrectAndNext() {
    const correctAnswer = quizData[currentQuestion].answer;
    const buttons = choicesElement.querySelectorAll('button');

    buttons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
        }
        btn.disabled = true;
    });

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// 9. Show result screen
function showResult() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    finalMessage.textContent = `Well done, ${playerName}! Your score is ${score} out of ${quizData.length}`;
}
