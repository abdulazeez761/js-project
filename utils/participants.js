let createParticipants = (level, name) => {
  let participantsLevel = level == 1 ? 'level-one' : 'level-two';
  let allParticipants = JSON.parse(localStorage.getItem('participants'));
  const entries = Object.entries(allParticipants);

  let id = entries.length ? +entries[entries.length - 1][0] + 1 : 1;

  let newParticipant = {
    id,
    name,
    level,
    result: 0,
    totalTime: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    questions: {},
    isActive: true,
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

  allParticipants[id].isActive = false;

  localStorage.setItem('participants', JSON.stringify(allParticipants));
};
