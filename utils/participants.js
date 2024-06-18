let createParticipants = (level, name) => {
  let participantsLevel = level == 1 ? 'level-one' : 'level-two';
  let questions = JSON.parse(localStorage.getItem(participantsLevel));
  let allParticipants = JSON.parse(localStorage.getItem('participants'));
  let id = Object.keys(allParticipants).length + 1;
  let newParticipantQustions = {};

  for (let question in questions) {
    question !== 'levleID' &&
      question !== 'started' &&
      (newParticipantQustions[question] = { timeTaken: 0, status: 0 });
  }
  let newParticipant = {
    id,
    name,
    level,
    result: 0,
    totalTime: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    questions: newParticipantQustions,
  };

  allParticipants[id] = newParticipant;

  localStorage.setItem('participants', JSON.stringify(allParticipants));
};

let deleteParticipantFromLocalStorage = (id) => {
  let allParticipants = JSON.parse(localStorage.getItem('participants'));

  if (!allParticipants) {
    console.log('No participants found in local storage.');
    return;
  }

  delete allParticipants[id];

  localStorage.setItem('participants', JSON.stringify(allParticipants));
};