const timerElement = document.querySelector('.timer');

let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
  if (timer) return; // Prevent multiple intervals
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    timerElement.textContent = `${formatTime(hours)}:${formatTime(
      minutes
    )}:${formatTime(seconds)}`;
  }, 1000);
}

function formatTimeTaken(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  let formattedTime = '';
  if (hours > 0) {
    formattedTime += `${hours}h `;
  }
  if (minutes > 0) {
    formattedTime += `${minutes}m `;
  }
  if (seconds > 0 || formattedTime === '') {
    formattedTime += `${seconds}s`;
  }
  return formattedTime.trim();
}
function stopTimer() {
  clearInterval(timer);
  timer = null;
}
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

let allParticipants = JSON.parse(localStorage.getItem('participants'));
let participantLevel = allParticipants;
const participantID = +localStorage.getItem('loged-in-userID');
participantLevel = participantLevel[participantID].level;
participantLevel = participantLevel == 1 ? 'level-one' : 'level-two';
let levelQuestions = JSON.parse(localStorage.getItem(participantLevel));

// Adding questions bar
let numberOfQuestions = Object.entries(levelQuestions).length - 2;
let currentParticipant = allParticipants[participantID];
let progressBar = document.getElementById('progress-bar-content');
for (let i = 1; i <= numberOfQuestions; i++) {
  let newDiv = document.createElement('div');
  newDiv.classList.add('circle');
  newDiv.innerText = i;
  progressBar.appendChild(newDiv);
}

// Getting all question IDs
let allQuestionsIDs = [];
for (let questionID in levelQuestions) {
  if (
    questionID !== 'levelID' &&
    questionID !== 'started' &&
    levelQuestions[questionID].isActive
  ) {
    allQuestionsIDs.push(questionID);
  }
}

// Tracking questions
let questionIndex = 0;
let currentQuestionID = allQuestionsIDs[questionIndex];
let questionTextContainer = document.getElementById('question-context');
const circles = document.querySelectorAll('.progress .circle');
let startTime;
let totalTime;
// Loading the first question
function loadFirstQuestion() {
  startTime = new Date();
  totalTime = new Date();
  startTimer();
  circles.forEach((circle, index) => {
    if (index === questionIndex) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }
  });
  questionTextContainer.innerText =
    levelQuestions[currentQuestionID].questionContext;
}

loadFirstQuestion();

const submitAnswer = () => {
  let answer = document.getElementById('answer-input');

  if (isNaN(answer.value) || !answer.value) {
    return Swal.fire({
      title: 'Answer should be a number',
      confirmButtonColor: '#3085d6',
    });
  }

  let correct =
    +answer.value == +levelQuestions[currentQuestionID].correctAnswers;
  let endTime = new Date();
  let timeTaken = (endTime - startTime) / 1000; // time taken in seconds

  // Store the time taken for the current question
  if (!currentParticipant.questions) {
    currentParticipant.questions = {};
  }
  currentParticipant.questions[currentQuestionID] = {
    answer: answer.value,
    correct: correct,
    timeTaken: formatTimeTaken(timeTaken),
  };

  // Save updated participant data
  allParticipants[participantID] = currentParticipant;
  localStorage.setItem('participants', JSON.stringify(allParticipants));

  // Moving to the next question
  questionIndex++;
  if (questionIndex < allQuestionsIDs.length - 1) {
    currentQuestionID = allQuestionsIDs[questionIndex];
    startTime = new Date(); // reset start time for the new question
    circles.forEach((circle, index) => {
      if (index === questionIndex) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });
    questionTextContainer.innerText =
      levelQuestions[currentQuestionID].questionContext;
    answer.value = '';
  } else {
    // Show a completion message and redirect
    let endTime = new Date();
    let timeTaken = (endTime - totalTime) / 1000;
    stopTimer();
    let numberOfCUrrectAnswer = 0;
    for (let question in currentParticipant.questions) {
      if (currentParticipant.questions[question].correct)
        ++numberOfCUrrectAnswer;
    }
    currentParticipant.totalTime = formatTimeTaken(timeTaken);
    currentParticipant.result = `${numberOfCUrrectAnswer}/${numberOfQuestions}`;
    currentParticipant.correctAnswers = numberOfCUrrectAnswer;
    allParticipants[participantID] = currentParticipant;
    localStorage.setItem('participants', JSON.stringify(allParticipants));

    Swal.fire({
      title: 'You have completed all questions!',
      confirmButtonColor: '#3085d6',
    }).then(() => {
      window.location.href = '../index.html';
    });
  }
};

function navigateTo(page) {
  Swal.fire({
    title: 'Are you sure you want to leave?',
    // text: 'you can take the comp ay time ',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes!',
    cancelButtonText: 'No!',
    confirmButtonColor: '#fc0102',
  }).then((result) => {
    if (result.isConfirmed) window.location.href = page;
  });
}
